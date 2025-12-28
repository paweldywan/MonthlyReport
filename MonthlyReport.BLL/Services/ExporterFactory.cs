using Microsoft.Extensions.DependencyInjection;
using MonthlyReport.BLL.Enums;
using MonthlyReport.BLL.Interfaces;
using MonthlyReport.BLL.Services.Exporters;

namespace MonthlyReport.BLL.Services
{
    public class ExporterFactory(IServiceProvider serviceProvider) : IExporterFactory
    {
        public IExporter CreateExporter(ExportType exportType) => exportType switch
        {
            ExportType.Xlsx => serviceProvider.GetRequiredService<XlsxExporter>(),
            ExportType.Xls => serviceProvider.GetRequiredService<XlsExporter>(),
            ExportType.Csv => serviceProvider.GetRequiredService<CsvExporter>(),
            ExportType.Pdf => serviceProvider.GetRequiredService<PdfExporter>(),
            ExportType.Html => serviceProvider.GetRequiredService<HtmlExporter>(),
            ExportType.Json => serviceProvider.GetRequiredService<JsonExporter>(),
            ExportType.Xml => serviceProvider.GetRequiredService<XmlExporter>(),
            ExportType.Txt => serviceProvider.GetRequiredService<TxtExporter>(),
            _ => throw new NotSupportedException($"Export type {exportType} is not supported.")
        };
    }
}
