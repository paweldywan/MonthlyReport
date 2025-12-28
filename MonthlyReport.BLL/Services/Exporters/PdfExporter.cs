using MonthlyReport.BLL.Constants;
using MonthlyReport.BLL.Interfaces;
using MonthlyReport.BLL.Models;

namespace MonthlyReport.BLL.Services.Exporters
{
    public class PdfExporter(IHtmlToPdfConverter htmlToPdfConverter) : IExporter
    {
        public async Task<(Stream stream, string fileName, string mimeType)> ExportAsync(ExportModel exportModel)
        {
            var pdfStream = await htmlToPdfConverter.GetPdf(exportModel, ExportConstants.TemplatePath);

            return (pdfStream, exportModel.FileName, ExportConstants.PdfMimeType);
        }
    }
}
