using MonthlyReport.BLL.Interfaces;
using MonthlyReport.BLL.Models;

namespace MonthlyReport.BLL.Services
{
    public class ExportService(IExporterFactory exporterFactory) : IExportService
    {
        public async Task<(Stream stream, string fileName, string mimeType)> Export(ExportModel exportModel)
        {
            var exporter = exporterFactory.CreateExporter(exportModel.ExportType);
            
            return await exporter.ExportAsync(exportModel);
        }
    }
}
