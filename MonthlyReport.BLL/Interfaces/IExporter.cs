using MonthlyReport.BLL.Models;

namespace MonthlyReport.BLL.Interfaces
{
    public interface IExporter
    {
        Task<(Stream stream, string fileName, string mimeType)> ExportAsync(ExportModel exportModel);
    }
}
