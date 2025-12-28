using MonthlyReport.BLL.Constants;
using MonthlyReport.BLL.Extensions;
using MonthlyReport.BLL.Interfaces;
using MonthlyReport.BLL.Models;

namespace MonthlyReport.BLL.Services.Exporters
{
    public class TxtExporter : IExporter
    {
        public Task<(Stream stream, string fileName, string mimeType)> ExportAsync(ExportModel exportModel)
        {
            var txt = exportModel.ToTxt();

            var txtStream = txt.ToStream();

            return Task.FromResult<(Stream, string, string)>((txtStream, exportModel.FileName, ExportConstants.TxtMimeType));
        }
    }
}
