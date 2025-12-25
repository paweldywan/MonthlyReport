# MonthlyReport

A full-stack web application for tracking, managing, and exporting monthly work reports with comprehensive authentication and multiple export formats.

---

## Live Application

**https://monthlyreport.paweldywan.com/**

---

## Overview

MonthlyReport is a modern web application built with .NET 9 and React that enables users to track their work hours, manage time entries, and export reports in various formats. The application features user authentication, data persistence with PostgreSQL, and flexible export capabilities.

## Key Features

- **User Authentication**: Secure user registration, login, and account management with ASP.NET Core Identity
- **Time Entry Management**: Create, read, update, and delete work time entries
- **Multiple Export Formats**: Export reports in XLSX, XLS, CSV, PDF, HTML, JSON, XML, and TXT formats
- **Data Filtering & Sorting**: Advanced filtering and sorting capabilities for time entries
- **Responsive UI**: Modern React-based frontend with Bootstrap styling
- **RESTful API**: Clean API design with Swagger documentation
- **Database Migrations**: Entity Framework Core with PostgreSQL support

## Architecture

The solution follows a clean, layered architecture:

```
MonthlyReport/
|
+-- MonthlyReport.Server/       # ASP.NET Core Web API + Razor Pages
|   +-- Controllers/            # API endpoints (Entry, Export, Account)
|   +-- Areas/Identity/         # Authentication pages
|   +-- Services/               # Template services
|   +-- Views/Templates/        # Razor templates for exports
|
+-- MonthlyReport.BLL/          # Business Logic Layer
|   +-- Services/               # Business services (Entry, Export, HtmlToPdf)
|   +-- Interfaces/             # Service contracts
|   +-- Models/                 # DTOs and view models
|   +-- Enums/                  # Export types, sort direction
|   +-- Extensions/             # Helper extensions
|
+-- MonthlyReport.DAL/          # Data Access Layer
|   +-- Entities/               # EF Core entities
|   +-- Migrations/             # Database migrations
|   +-- MonthlyReportContext.cs # DbContext
|   +-- MonthlyReportSeeder.cs  # Database seeding
|
+-- monthlyreport.client/       # React + TypeScript Frontend
    +-- src/                    # React components and logic
    +-- package.json            # Node dependencies
```

## Getting Started

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js 18+](https://nodejs.org/) and npm
- [PostgreSQL](https://www.postgresql.org/download/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/paweldywan/MonthlyReport.git
   cd MonthlyReport
   ```

2. **Configure the database**
   
   Update the connection string in `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Database=MonthlyReport;Username=your_user;Password=your_password"
     }
   }
   ```

3. **Restore and build the backend**
   ```bash
   dotnet restore
   dotnet build
   ```

4. **Apply database migrations**
   ```bash
   dotnet ef database update --project MonthlyReport.DAL --startup-project MonthlyReport.Server
   ```

5. **Install frontend dependencies**
   ```bash
   cd monthlyreport.client
   npm install
   ```

### Running the Application

#### Development Mode

**Option 1: Run both together (recommended)**
```bash
# From the solution root
dotnet run --project MonthlyReport.Server
```
This starts both the backend (https://localhost:7118) and frontend (https://localhost:5173) via SPA proxy.

**Option 2: Run separately**

Backend:
```bash
dotnet run --project MonthlyReport.Server
```

Frontend (in a separate terminal):
```bash
cd monthlyreport.client
npm run dev
```

#### Production Build

```bash
# Build frontend
cd monthlyreport.client
npm run build

# Run server
cd ..
dotnet run --project MonthlyReport.Server --configuration Release
```

## Technology Stack

### Backend
- **.NET 9** - Web framework
- **ASP.NET Core Identity** - Authentication & authorization
- **Entity Framework Core 9** - ORM
- **PostgreSQL** - Database
- **Npgsql** - PostgreSQL provider
- **AutoMapper** - Object mapping
- **Puppeteer Sharp** - PDF generation
- **ClosedXML** - Excel file generation
- **CsvHelper** - CSV processing
- **Swashbuckle** - API documentation

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Bootstrap 5** - Styling
- **Reactstrap** - React Bootstrap components
- **Font Awesome** - Icons
- **Moment.js** - Date handling

## API Documentation

When running in development mode, access the Swagger UI at:
```
https://localhost:7118/swagger
```

### Main Endpoints

- **Entry Management**
  - `GET /api/entry` - Get filtered entries
  - `POST /api/entry` - Create new entry
  - `PUT /api/entry/{id}` - Update entry
  - `DELETE /api/entry/{id}` - Delete entry

- **Export**
  - `POST /api/export` - Export entries in various formats (XLSX, CSV, PDF, etc.)

- **Account**
  - Identity endpoints for authentication and account management

## Database Schema

**Entry Table**
- `Id` - Primary key
- `DateFrom` - Start date/time
- `DateTo` - End date/time
- `Hours` - Calculated hours
- `UserId` - Foreign key to AspNetUsers
- Additional fields for work description, project, etc.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Pawel Dywan**
- Website: [paweldywan.com](https://paweldywan.com/)
- GitHub: [@paweldywan](https://github.com/paweldywan)

## Acknowledgments

- Built with ASP.NET Core and React
- Uses modern .NET 9 features
- Razor Pages for server-side rendering
- Clean architecture principles
