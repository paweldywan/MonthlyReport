using CsvHelper;
using CsvHelper.Configuration;
using MonthlyReport.BLL.Constants;
using MonthlyReport.BLL.Extensions;
using MonthlyReport.BLL.Interfaces;
using MonthlyReport.BLL.Models;
using System.Globalization;

namespace MonthlyReport.BLL.Services.Exporters
{
    public class CsvExporter : IExporter
    {
        public async Task<(Stream stream, string fileName, string mimeType)> ExportAsync(ExportModel exportModel)
        {
            var stream = new MemoryStream();

            using (var writer = new StreamWriter(stream, leaveOpen: true))
            {
                using var csv = new CsvWriter(writer, new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                    HasHeaderRecord = false
                });

                await csv.AddHeader(exportModel);

                await csv.AddRows(exportModel);
            }

            stream.GoToStart();

            return (stream, exportModel.FileName, ExportConstants.CsvMimeType);
        }
    }
}
