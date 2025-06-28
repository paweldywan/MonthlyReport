# MonthlyReport

MonthlyReport is a multi-project solution for generating, exporting, and managing monthly reports. It consists of a backend (C# .NET), a client-side web application (TypeScript/React), and supporting libraries for business logic and data access.

## Solution Structure

- **MonthlyReport.Server/**: ASP.NET Core backend server, API endpoints, and web hosting.
- **MonthlyReport.BLL/**: Business logic layer, services, models, and utility extensions.
- **MonthlyReport.DAL/**: Data access layer, Entity Framework context, migrations, and entities.
- **monthlyreport.client/**: Frontend client built with React and TypeScript.

## Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)

### Backend Setup
1. Navigate to the solution root.
2. Restore NuGet packages:
   ```sh
   dotnet restore
   ```
3. Build the solution:
   ```sh
   dotnet build
   ```
4. Apply database migrations (optional, if using EF Core):
   ```sh
   dotnet ef database update --project MonthlyReport.DAL --startup-project MonthlyReport.Server
   ```
5. Run the server:
   ```sh
   dotnet run --project MonthlyReport.Server
   ```

### Frontend Setup
1. Navigate to `monthlyreport.client`:
   ```sh
   cd monthlyreport.client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Project Features
- Export reports in various formats (CSV, PDF, etc.)
- Customizable report templates
- Data filtering and sorting
- Modern React frontend
- RESTful API backend

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

---

[Live Demo](https://monthlyreport.paweldywan.com/)
