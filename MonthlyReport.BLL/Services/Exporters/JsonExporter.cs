using MonthlyReport.BLL.Constants;
using MonthlyReport.BLL.Extensions;
using MonthlyReport.BLL.Interfaces;
using MonthlyReport.BLL.Models;
using System.Text.Json;

namespace MonthlyReport.BLL.Services.Exporters
{
    public class JsonExporter : IExporter
    {
        public Task<(Stream stream, string fileName, string mimeType)> ExportAsync(ExportModel exportModel)
        {
            var stream = new MemoryStream();

            using (var writer = new Utf8JsonWriter(stream))
            {
                exportModel.Data.WriteTo(writer);
            }

            stream.GoToStart();

            return Task.FromResult<(Stream, string, string)>((stream, exportModel.FileName, ExportConstants.JsonMimeType));
        }
    }
}
