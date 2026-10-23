## [2.0.0](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/compare/v1.0.0...v2.0.0) (2026-10-23)

### ⚠ BREAKING CHANGES

* **Abstractions:** - All references to `(Type, string)` tuples have been changed to `PolymorphicMapping` for `DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicParameterlessConstructor)`, improving trim/AOT analysis. Previously, code analysis could fail if the warning was traced to XmlSerializationOptions.cs via ProjectReference.
- Method definitions with a `Type`-type parameter will now warn with IL2077 if the argument is not annotated as public-parameterless constructor.
- implicit conversions between `(Type,string)` and `PolymorphicMapping` have been removed because the public-parameterless-constructor annotations are lost in conversion.
- record-class `XmlSourceGenerator.Abstractions.XmlPropertySettings.PolymorphicMapping` has been moved to `XmlSourceGenerator.Abstractions.PolymorphicMapping`
* Overload `WriteDataToStreamAsync<T>(Stream stream, IEnumerable<T> items, XmlSerializationOptions? options = null, string rootName = "ArrayOfItems", string? itemName = null)` has been removed. Calls to `WriteDataToStreamAsync<T>(Stream stream, T item, XmlSerializationOptions? options = null, string? rootName = null, string? itemName = null)` where `T : IEnumerable` will throw an `ArgumentException` telling you to use `WriteEnumerableDataToStreamAsync`.

### Features

* **Abstractions:** add `XmlPropertySettings.PolymorphicMapping` to replace `(Type, string)` tuple + constraints on `Type` ([cebc7e5](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/cebc7e5f2cdf07a981fc2a4ad89233bf75876bda))
* add `GeneratorTypeModel.IsNullableAnnotated` to track symbols whose types have `?` annotation ([1144246](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/1144246e6ab668d1cb788e32880b2be8c42a7af8))
* add `WriteEnumerableDataToStreamAsync` ([98e68c3](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/98e68c330f1d342ed696945bbf166ddb8fe77b0c))

### Bug Fixes

* **Abstractions:** resolve some  IL2077 `'Type' argument does not satisfy 'DynamicallyAccessedMemberTypes.PublicParameterlessConstructor'` warnings; annotate generated `Type` field as `PublicParameterlessConstructor`; annotated `Type` parameters ([b559d3d](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/b559d3d9c875a0f049aacfdc903b3fba26dd32bb))
* add `new` modifier to generated `IXmlStreamable` members when a base class implements it manually or via `XmlAutoGenerate` ([617d025](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/617d0258ca4f4df28975cc54149b89900ddb060a)), closes [#10](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/issues/10)
* add diagnostics' `helpLinkUri`s ([aec2943](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/aec29436bda5f14a8c4e3f9d63a279e2e146ed39))
* allow implicit list serialization; do not enable `IsFlattened` on `Collection`-like objects ([675b3a3](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/675b3a3cd520a0575d117b232d5cf91bc489ae3f))
* annotate `Type`-type parameters of `WriteEnumerableDataToStreamAsync` and `GetRootName` with `PublicParameterlessConstructor` ([6b242ea](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/6b242ea689c7796fa2f790c65b4de2bd2cc76638))
* append EOF newline to generated output ([7f2047c](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/7f2047c9f2c0096a43bcfa2786b104626749ee94))
* enable Release tracking analyzer ([f3dca9b](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/f3dca9b3a60447506f2d780265ac7248f99e2cf5))
* explicitly define `PolymorphicMapping`'s properties; add `PublicParameterlessConstructor` to the `Type` property ([a97ef26](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/a97ef26d4ef4f08ca2575d7f716927c6986bc4e4))
* forgive some `null` false-positives; convert `null` from `CreateInstance` to `Nullable<T>?` ([c737191](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/c7371915d5c519b6aee9e7f8bb49f9922f5e85e1))
* **Generators:** remove redundant space in `ReadFromXml` output ([c1173a2](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/c1173a27d1ea8d74c11300c7cd859db691029229))
* ignore `XAttribute`-type symbols in addition to `XElement`-type symbols ([a4b1560](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/a4b1560b43398d165ddcec49c1558ca3a84dd8d9)), closes [#11](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/issues/11)
* prepend source generator header; conditionally enable/restore [#nullable](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/issues/nullable), ([2209e75](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/2209e751d191509264573be3c59fccfe6d86e137))
* resolve CS1587 warnings caused by 2209e75 ([6df696b](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/6df696b22ab622669da635ee4683967c6306954c))
* resolve warning RS1032; add trailing periods to diagnostic messages ([2408a32](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/2408a32bc0d1d6a01c877590a55aad8045ab0d97))
* **XmlSourceGenerator:** prevent CS0457 when casting `XElement` to `byte` ([00fe40c](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/00fe40c09da25f87cada171b5a63ab9c723c1b94))

## 2.0.0-alpha.1 (2026-10-23)

### ⚠ BREAKING CHANGES

* **Abstractions:** - All references to `(Type, string)` tuples have been changed to `PolymorphicMapping` for `DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicParameterlessConstructor)`, improving trim/AOT analysis. Previously, code analysis could fail if the warning was traced to XmlSerializationOptions.cs via ProjectReference.

- Method definitions with a `Type`-type parameter will now warn with IL2077 if the argument is not annotated as public-parameterless constructor.
* implicit conversions between `(Type,string)` and `PolymorphicMapping` have been removed because the public-parameterless-constructor annotations are lost in conversion.
* record-class `XmlSourceGenerator.Abstractions.XmlPropertySettings.PolymorphicMapping` has been moved to `XmlSourceGenerator.Abstractions.PolymorphicMapping`

* Overload `WriteDataToStreamAsync<T>(Stream stream, IEnumerable<T> items, XmlSerializationOptions? options = null, string rootName = "ArrayOfItems", string? itemName = null)` has been removed. Calls to `WriteDataToStreamAsync<T>(Stream stream, T item, XmlSerializationOptions? options = null, string? rootName = null, string? itemName = null)` where `T : IEnumerable` will throw an `ArgumentException` telling you to use `WriteEnumerableDataToStreamAsync`.

### Features

* **Abstractions:** add `XmlPropertySettings.PolymorphicMapping` to replace `(Type, string)` tuple + constraints on `Type` ([cebc7e5](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/cebc7e5f2cdf07a981fc2a4ad89233bf75876bda))
* add `GeneratorTypeModel.IsNullableAnnotated` to track symbols whose types have `?` annotation ([1144246](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/1144246e6ab668d1cb788e32880b2be8c42a7af8))
* add `WriteEnumerableDataToStreamAsync` ([98e68c3](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/98e68c330f1d342ed696945bbf166ddb8fe77b0c))

### Bug Fixes

* **Abstractions:** resolve some  IL2077 `'Type' argument does not satisfy 'DynamicallyAccessedMemberTypes.PublicParameterlessConstructor'` warnings; annotate generated `Type` field as `PublicParameterlessConstructor`; annotated `Type` parameters ([b559d3d](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/b559d3d9c875a0f049aacfdc903b3fba26dd32bb))
* add `new` modifier to generated `IXmlStreamable` members when a base class implements it manually or via `XmlAutoGenerate` ([617d025](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/617d0258ca4f4df28975cc54149b89900ddb060a)), closes [#10](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/issues/10)
* add diagnostics' `helpLinkUri`s ([aec2943](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/aec29436bda5f14a8c4e3f9d63a279e2e146ed39))
* allow implicit list serialization; do not enable `IsFlattened` on `Collection`-like objects ([675b3a3](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/675b3a3cd520a0575d117b232d5cf91bc489ae3f))
* annotate `Type`-type parameters of `WriteEnumerableDataToStreamAsync` and `GetRootName` with `PublicParameterlessConstructor` ([6b242ea](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/6b242ea689c7796fa2f790c65b4de2bd2cc76638))
* append EOF newline to generated output ([7f2047c](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/7f2047c9f2c0096a43bcfa2786b104626749ee94))
* enable Release tracking analyzer ([f3dca9b](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/f3dca9b3a60447506f2d780265ac7248f99e2cf5))
* explicitly define `PolymorphicMapping`'s properties; add `PublicParameterlessConstructor` to the `Type` property ([a97ef26](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/a97ef26d4ef4f08ca2575d7f716927c6986bc4e4))
* forgive some `null` false-positives; convert `null` from `CreateInstance` to `Nullable<T>?` ([c737191](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/c7371915d5c519b6aee9e7f8bb49f9922f5e85e1))
* **Generators:** remove redundant space in `ReadFromXml` output ([c1173a2](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/c1173a27d1ea8d74c11300c7cd859db691029229))
* ignore `XAttribute`-type symbols in addition to `XElement`-type symbols ([a4b1560](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/a4b1560b43398d165ddcec49c1558ca3a84dd8d9)), closes [#11](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/issues/11)
* prepend source generator header; conditionally enable/restore [#nullable](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/issues/nullable), ([2209e75](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/2209e751d191509264573be3c59fccfe6d86e137))
* resolve CS1587 warnings caused by 2209e75 ([6df696b](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/6df696b22ab622669da635ee4683967c6306954c))
* resolve warning RS1032; add trailing periods to diagnostic messages ([2408a32](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/2408a32bc0d1d6a01c877590a55aad8045ab0d97))
* **XmlSourceGenerator:** prevent CS0457 when casting `XElement` to `byte` ([00fe40c](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/00fe40c09da25f87cada171b5a63ab9c723c1b94))

# Changelog

## [Unreleased] 1.1.0-alpha

### ⚠ BREAKING CHANGES

* Overload `WriteDataToStreamAsync<T>(Stream stream, IEnumerable<T> items, XmlSerializationOptions? options = null, string rootName = "ArrayOfItems", string? itemName = null)` has been removed. Calls to `WriteDataToStreamAsync<T>(Stream stream, T item, XmlSerializationOptions? options = null, string? rootName = null, string? itemName = null)` where `T : IEnumerable` will throw an `ArgumentException` telling you to use `WriteEnumerableDataToStreamAsync`.

### Features

* add `WriteEnumerableDataToStreamAsync` ([98e68c3](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/98e68c330f1d342ed696945bbf166ddb8fe77b0c))

### Bug Fixes

* add diagnostics' `helpLinkUri`s ([aec2943](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/aec29436bda5f14a8c4e3f9d63a279e2e146ed39))
* allow implicit list serialization; do not enable `IsFlattened` on `Collection`-like objects ([675b3a3](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/675b3a3cd520a0575d117b232d5cf91bc489ae3f))
* enable Release tracking analyzer ([f3dca9b](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/f3dca9b3a60447506f2d780265ac7248f99e2cf5))
* **Generators:** remove redundant space in `ReadFromXml` output ([c1173a2](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/c1173a27d1ea8d74c11300c7cd859db691029229))
* resolve warning RS1032; add trailing periods to diagnostic messages ([2408a32](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/2408a32bc0d1d6a01c877590a55aad8045ab0d97))
* **XmlSourceGenerator:** prevent CS0457 when casting `XElement` to `byte` ([00fe40c](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/00fe40c09da25f87cada171b5a63ab9c723c1b94))
* prepend source generator header; conditionally enable/restore #nullable ([2209e75](https://github.com/BinToss/saivineeth100.XmlSourceGenerator/commit/2209e751d191509264573be3c59fccfe6d86e137)), closes [#3](https://github.com/saivineeth100/XmlSourceGenerator/issues/3)
* append EOF newline to generated output

## 1.0.2-alpha (2026-03-30)

### Features

* added `[JsonIgnore]` for `DefaultXmlRootElementName`

## 1.0.1-alpha (2026-03-21)

### Bug Fixes

* Improve `XmlWriteGenerator` polymorphic list handling: add IsSimpleKind helper, delegate to standard collection logic for simple types, and ensure correct XML parent usage for complex types.

## 1.0.0-alpha (2026-01-28)

### Added

* **Standard XML Attributes**: Added support for standard XML serialization attributes in the `XmlSourceGenerator.Attributes` namespace. These attributes mirror `System.Xml.Serialization` attributes, allowing for dependency-free usage or easy migration.
  * `[XmlRoot]`: Customizes the root element name and namespace.
  * `[XmlElement]`: Customizes element name and namespace.
  * `[XmlAttribute]`: Serializes property as an XML attribute.
  * `[XmlIgnore]`: Excludes property from serialization.
  * `[XmlText]`: Serializes property as inner text.
  * `[XmlArray]`: Wraps collection in a container element.
  * `[XmlArrayItem]`: Specifies element name for collection items.
* **Named Argument Support**: Updated the source generator logic (`PropertyAnalyzer`, `XmlWriteGenerator`, and `EnumHelper`) to support setting attribute properties via named arguments (e.g., `[XmlElement(ElementName="Name")]`, `[XmlEnum(Name="Val")]`, `[XmlType(TypeName="Type")]`) in addition to constructor arguments. This ensures full compatibility with standard attribute usage patterns.

### Changed

* **Namespace Refactoring**: Moved all attributes from `SourceGeneratorUtils` to `XmlSourceGenerator.Attributes`.
  * `XmlAutoGeneratedAttribute` is now in `XmlSourceGenerator.Attributes`.
  * Existing attributes like `XmlEnumAttribute`, `XmlAnyElementAttribute`, etc., are now in `XmlSourceGenerator.Attributes`.
* **XmlTypeAttribute**: Updated `[XmlType]` to match the `System.Xml.Serialization.XmlTypeAttribute` signature.
  * Added a parameterless constructor.
  * Made `TypeName` and `Namespace` settable properties.
* **Generator Logic**: Updated `XmlSourceGenerator` to detect `XmlAutoGeneratedAttribute` in the new `XmlSourceGenerator.Attributes` namespace.

### Documentation

* Updated `docs/attributes.md` to reflect the new namespace and supported attributes.
* Added this `CHANGELOG.md` to track changes.

### Tests & Samples

* Updated all integration tests, unit tests, and samples to use the new `XmlSourceGenerator.Attributes` namespace.
