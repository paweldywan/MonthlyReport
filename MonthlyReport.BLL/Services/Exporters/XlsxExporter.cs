using MonthlyReport.BLL.Constants;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace MonthlyReport.BLL.Services.Exporters
{
    public class XlsxExporter : ExcelExporter
    {
        protected override IWorkbook CreateWorkbook() => new XSSFWorkbook();

        protected override string MimeType => ExportConstants.XlsxMimeType;
    }
}