using System.Diagnostics.CodeAnalysis;

namespace XmlSourceGenerator.Abstractions
{
    /// <summary>
    /// Configuration settings for a specific property during XML serialization.
    /// </summary>
    public class XmlPropertySettings
    {
        /// <summary>
        /// The XML element name to use for this property.
        /// If null, the default name (or other strategies) will be used.
        /// </summary>
        public string? XmlName { get; set; }

        /// <summary>
        /// Polymorphic type mappings for this property.
        /// List of (Type, ElementName) tuples.
        /// </summary>
        public List<PolymorphicMapping>? PolymorphicMappings { get; set; }

        public record class PolymorphicMapping(
            [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicParameterlessConstructor)]
            Type Type,
            string Name
        )
        {
            public static implicit operator (Type Type, string Name)(PolymorphicMapping v) => (v.Type, v.Name);
            public static implicit operator PolymorphicMapping((Type, string) v) => new(v.Item1, v.Item2);
        };
    }
}
