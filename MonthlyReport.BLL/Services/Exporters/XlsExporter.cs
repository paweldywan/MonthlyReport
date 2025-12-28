using MonthlyReport.BLL.Constants;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;

namespace MonthlyReport.BLL.Services.Exporters
{
    public class XlsExporter : ExcelExporter
    {
        protected override IWorkbook CreateWorkbook() => new HSSFWorkbook();

        protected override string MimeType => ExportConstants.XlsMimeType;
    }
}