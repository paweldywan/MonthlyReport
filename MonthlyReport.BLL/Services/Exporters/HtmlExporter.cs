using MonthlyReport.BLL.Constants;
using MonthlyReport.BLL.Extensions;
using MonthlyReport.BLL.Interfaces;
using MonthlyReport.BLL.Models;

namespace MonthlyReport.BLL.Services.Exporters
{
    public class HtmlExporter(ITemplateService templateService) : IExporter
    {
        public async Task<(Stream stream, string fileName, string mimeType)> ExportAsync(ExportModel exportModel)
        {
            var html = await templateService.RenderAsync(ExportConstants.TemplatePath, exportModel);

            var htmlStream = html.ToStream();

            return (htmlStream, exportModel.FileName, ExportConstants.HtmlMimeType);
        }
    }
}
