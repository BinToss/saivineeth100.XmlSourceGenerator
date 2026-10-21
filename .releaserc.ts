/// <reference types="@halospv3/hce.shared-config/semantic-release__commit-analyzer" />
import { getConfig } from '@halospv3/hce.shared-config/semanticReleaseConfigDotnet';
import type { Options } from 'semantic-release';
import type { PluginSpecSRCommitAnalyzer, PluginSpecSRReleaseNotesGen } from '@halospv3/hce.shared-config/semanticReleaseConfig';
import type { RuleObjects } from '@semantic-release/commit-analyzer';
import { exit } from 'node:process';

const projectsToPublish = [
  './src/XmlSourceGenerator/XmlSourceGenerator.csproj',
  './src/XmlSourceGenerator.Abstractions/XmlSourceGenerator.Abstractions.csproj',
];
const projectsToPackAndPush = projectsToPublish;

async function tryGetConfig(projectsToPublish: Parameters<typeof getConfig>[0], projectsToPackAndPush: Parameters<typeof getConfig>[1]) {
  try {
    return await getConfig(projectsToPublish, projectsToPackAndPush);
  }
  catch (error: unknown) {
    const _error = Error.isError(error)
      ? error
      : new Error('unknown error', { cause: error });
    console.error(_error);
    return _error;
  }
}

const config: Options | Error = await tryGetConfig(
  projectsToPublish,
  projectsToPackAndPush,
);

if (Error.isError(config)) {
  console.error(config);
  exit(1);
}
else {
  try {
    config.branches ??= [];
    if (typeof config.branches === 'string' || !('find' in config.branches))
      config.branches = [config.branches];

    // config.branches is a read-only array. So, we need to use a copy and overwrite the whole array
    {
      const copy = [...config.branches];
      if (copy[0] === 'main') {
        copy[0] = 'bintoss/main';
      }
      else {
        const mainBranchString = copy[0] == undefined
          ? 'null or undefined'
          : JSON.stringify(copy[0]);
        console.error('config.branches[0] is expected to be \'main\'; It is currently ' + mainBranchString);
      }

      config.branches = copy;
    }

    const developmentBranch = config.branches.find(branch =>
      typeof branch !== 'string' && branch.name === 'develop',
    ) as Exclude<typeof config.branches[number], string>;
    developmentBranch.prerelease = 'alpha';
    developmentBranch.name = 'bintoss/develop';

    const sRCA = config.plugins?.find<PluginSpecSRCommitAnalyzer>(
      (p): p is PluginSpecSRCommitAnalyzer => p[0] === '@semantic-release/commit-analyzer',
    );
    if (sRCA) {
      const releaseRules = (
        typeof sRCA[1].releaseRules === 'string'
          ? (await import(sRCA[1].releaseRules) as (Exclude<typeof sRCA[1]['releaseRules'], string>))
          : sRCA[1].releaseRules
      ) ?? [];
      sRCA[1].releaseRules = [
        ...releaseRules,
        { type: 'revert', subject: '!(feat|fix|perf)', release: false },
        { type: 'revert', subject: '(build|chore|ci|docs|refactor|revert|style|test)', release: false },
      ] as RuleObjects.ConventionalCommits[];
    }

    const releaseNotesGen = config.plugins?.find<PluginSpecSRReleaseNotesGen>(
      (p): p is PluginSpecSRReleaseNotesGen => p[0] === '@semantic-release/release-notes-generator',
    );
    if (releaseNotesGen) {
      releaseNotesGen[1].preset = 'conventionalcommits';
    }
  }
  catch (_error: unknown) {
    const error = Error.isError(_error)
      ? _error
      : new Error(
          typeof _error == 'string'
            ? _error
            : JSON.stringify(_error),
        );
    console.error(error.stack);
    throw error;
  }
}
export default config;
