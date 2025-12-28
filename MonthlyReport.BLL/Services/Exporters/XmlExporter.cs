using MonthlyReport.BLL.Constants;
using MonthlyReport.BLL.Extensions;
using MonthlyReport.BLL.Interfaces;
using MonthlyReport.BLL.Models;
using System.Xml;

namespace MonthlyReport.BLL.Services.Exporters
{
    public class XmlExporter : IExporter
    {
        public async Task<(Stream stream, string fileName, string mimeType)> ExportAsync(ExportModel exportModel)
        {
            var stream = new MemoryStream();

            var xmlDocument = exportModel.Data.ToXmlDocument();

            var xmlWriterSettings = new XmlWriterSettings
            {
                Async = true
            };

            using (var writer = XmlWriter.Create(stream, xmlWriterSettings))
            {
                await xmlDocument.WriteToAsync(writer, CancellationToken.None);
            }

            stream.GoToStart();

            return (stream, exportModel.FileName, ExportConstants.XmlMimeType);
        }
    }
}
