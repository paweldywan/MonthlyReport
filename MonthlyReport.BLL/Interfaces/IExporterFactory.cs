using MonthlyReport.BLL.Enums;

namespace MonthlyReport.BLL.Interfaces
{
    public interface IExporterFactory
    {
        IExporter CreateExporter(ExportType exportType);
    }
}
