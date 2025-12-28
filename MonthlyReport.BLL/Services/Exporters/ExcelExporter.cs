using MonthlyReport.BLL.Constants;
using MonthlyReport.BLL.Extensions;
using MonthlyReport.BLL.Interfaces;
using MonthlyReport.BLL.Models;
using NPOI.SS.UserModel;

namespace MonthlyReport.BLL.Services.Exporters
{
    public abstract class ExcelExporter : IExporter
    {
        protected abstract IWorkbook CreateWorkbook();
        
        protected abstract string MimeType { get; }

        public Task<(Stream stream, string fileName, string mimeType)> ExportAsync(ExportModel exportModel)
        {
            using var workbook = CreateWorkbook();

            var sheet = workbook.CreateSheet(ExportConstants.SheetName);

            sheet.AddHeader(out var rowIndex, exportModel);

            sheet.AddRows(rowIndex, exportModel);

            sheet.AutoSizeColumns();

            var stream = workbook.GetMemoryStream();

            return Task.FromResult<(Stream, string, string)>((stream, exportModel.FileName, MimeType));
        }
    }
}
