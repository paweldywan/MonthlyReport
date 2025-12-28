using System.Text.Json.Nodes;
using System.Xml.Linq;

namespace MonthlyReport.BLL.Extensions
{
    public static class JsonArrayExtensions
    {
        public static XDocument ToXmlDocument(this JsonArray jsonArray, string rootElementName = "Root")
        {
            var root = new XElement(rootElementName);

            foreach (var jsonElement in jsonArray)
            {
                if (jsonElement is JsonObject jsonObject)
                {
                    var element = new XElement("Item");

                    foreach (var property in jsonObject)
                    {
                        element.Add(new XElement(property.Key, property.Value?.ToString()));
                    }

                    root.Add(element);
                }
            }

            return new XDocument(root);
        }
    }
}