import { useRef } from 'react';
import { BarChart, PieChart, Gauge } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Paper,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { renderToString } from 'react-dom/server';

// Fix leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName} | ${row.lastName}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: 'Melisandre', age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const ReportsPage = () => {
  const printRef = useRef(null);

  // Function to generate static HTML for charts
  const generateChartSVG = () => {
    // Since we can't easily render charts to static HTML, we'll create simple tables
    return `
      <div class="charts-grid">
        <div class="chart-card">
          <h3>Monthly Report Output</h3>
          <table class="data-table">
            <thead>
              <tr><th>Month</th><th>Generated</th><th>Completed</th></tr>
            </thead>
            <tbody>
              <tr><td>January</td><td>18</td><td>12</td></tr>
              <tr><td>February</td><td>24</td><td>19</td></tr>
              <tr><td>March</td><td>20</td><td>17</td></tr>
              <tr><td>April</td><td>27</td><td>23</td></tr>
            </tbody>
          </table>
        </div>
        <div class="chart-card">
          <h3>Report Category Share</h3>
          <table class="data-table">
            <thead><tr><th>Category</th><th>Percentage</th></tr></thead>
            <tbody>
              <tr><td>Sales</td><td>35%</td></tr>
              <tr><td>Development</td><td>44%</td></tr>
              <tr><td>Marketing</td><td>21%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  const handlePrint = () => {
    // Calculate KPI values
    const totalUsers = rows.length;
    const avgAge = Math.round(rows.filter(r => r.age).reduce((sum, r) => sum + r.age, 0) / rows.filter(r => r.age).length);
    const activeUsers = rows.filter(r => r.age && r.age < 100).length;
    const completionRate = Math.round((rows.filter(r => r.age).length / rows.length) * 100);

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    // Generate static table rows
    const tableRows = rows.map(row => `
      <tr>
        <td>${row.id}</td>
        <td>${row.firstName}</td>
        <td>${row.lastName}</td>
        <td>${row.age || 'N/A'}</td>
        <td>${row.firstName} | ${row.lastName}</td>
      </tr>
    `).join('');

    // Generate gauge indicators as progress bars
    const gauges = [
      { label: 'Efficiency', value: 65 },
      { label: 'Quality', value: 85 },
      { label: 'Satisfaction', value: 45 }
    ];

    const gaugeHTML = gauges.map(gauge => `
      <div class="gauge-item">
        <div class="gauge-label">${gauge.label}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${gauge.value}%;"></div>
        </div>
        <div class="gauge-value">${gauge.value}%</div>
      </div>
    `).join('');

    const printContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Reports Export - ${exportedAt}</title>
<style>
  @page {
    size: A4;
    margin: 15mm;
  }
  
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    background: #ffffff;
    color: #18181b;
    line-height: 1.5;
  }
  
  .print-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .print-header {
    border-bottom: 2px solid #18181b;
    padding-bottom: 16px;
    margin-bottom: 24px;
  }
  
  .print-header h1 {
    margin: 0 0 8px 0;
    font-size: 28px;
    font-weight: 700;
    color: #18181b;
  }
  
  .print-header p {
    margin: 0;
    font-size: 14px;
    color: #52525b;
  }
  
  .print-meta {
    margin-top: 12px;
    font-size: 12px;
    color: #71717a;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  
  .section {
    margin-bottom: 32px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  .section-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #18181b;
    border-left: 4px solid #18181b;
    padding-left: 12px;
  }
  
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .kpi-card {
    border: 2px solid #18181b;
    border-radius: 16px;
    background: #f4f4f5;
    padding: 20px;
    text-align: center;
  }
  
  .kpi-value {
    font-size: 32px;
    font-weight: 700;
    color: #18181b;
    margin: 0 0 8px 0;
  }
  
  .kpi-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #71717a;
    margin: 0;
  }
  
  .charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 24px;
    margin-bottom: 24px;
  }
  
  .chart-card, .table-card, .map-card {
    border: 2px solid #18181b;
    border-radius: 16px;
    background: #f4f4f5;
    padding: 20px;
  }
  
  .chart-card h3, .table-card h3, .map-card h3 {
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    color: #18181b;
  }
  
  .gauges-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px;
    margin-top: 16px;
  }
  
  .gauge-item {
    text-align: center;
    width: 150px;
  }
  
  .gauge-label {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #18181b;
  }
  
  .progress-bar {
    width: 100%;
    height: 12px;
    background: #e4e4e7;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: #18181b;
    border-radius: 6px;
  }
  
  .gauge-value {
    margin-top: 8px;
    font-size: 18px;
    font-weight: 700;
    color: #18181b;
  }
  
  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }
  
  .data-table th, .data-table td {
    border: 1px solid #e4e4e7;
    padding: 8px 12px;
    text-align: left;
  }
  
  .data-table th {
    background: #e4e4e7;
    font-weight: 600;
    color: #18181b;
  }
  
  .map-placeholder {
    background: #e4e4e7;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    color: #71717a;
  }
  
  .footer {
    margin-top: 32px;
    padding-top: 16px;
    border-top: 1px solid #e4e4e7;
    font-size: 11px;
    color: #71717a;
    text-align: center;
  }
  
  @media print {
    body {
      background: white;
    }
  }
</style>
</head>
<body>
<div class="print-container">
  <div class="print-header">
    <h1>Reports Summary</h1>
    <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
    <div class="print-meta">
      <span>Generated on: ${exportedAt}</span>
      <span>Report ID: RPT-${Date.now()}</span>
    </div>
  </div>
  
  <!-- KPI Cards -->
  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-value">${totalUsers}</div>
      <div class="kpi-label">Total Reports</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-value">${avgAge}</div>
      <div class="kpi-label">Avg Age</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-value">${activeUsers}</div>
      <div class="kpi-label">Active</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-value">${completionRate}%</div>
      <div class="kpi-label">Completion</div>
    </div>
  </div>
  
  <!-- Gauges -->
  <div class="section">
    <div class="chart-card">
      <h3>Performance Metrics</h3>
      <div class="gauges-container">
        ${gaugeHTML}
      </div>
    </div>
  </div>
  
  <!-- Charts -->
  ${generateChartSVG()}
  
  <!-- Users Table -->
  <div class="section">
    <div class="table-card">
      <h3>Report Data Table</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Full Name</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  </div>
  
  <!-- Map Placeholder -->
  <div class="section">
    <div class="map-card">
      <h3>Report Locations Map</h3>
      <div class="map-placeholder">
        <div style="text-align: center;">
          <p>📍 Manila - Report Hub</p>
          <p>📍 Makati - Sales Office</p>
          <p>📍 Quezon City - Dev Center</p>
          <p style="font-size: 12px; margin-top: 12px;">Interactive map available in the web version</p>
        </div>
      </div>
    </div>
  </div>
  
  <div class="footer">
    <p>This report is system-generated. Please contact support for any discrepancies.</p>
  </div>
</div>
</body>
</html>`;

    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-6 py-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Reports</h1>
            <p className="text-sm text-zinc-600 mt-2">
              Report analytics overview showing generated reports, category breakdown, and current completion performance.
            </p>
          </div>
          <Button
            variant="contained"
            onClick={handlePrint}
            startIcon={<PictureAsPdfIcon />}
            sx={{
              bgcolor: '#18181b',
              '&:hover': { bgcolor: '#27272a' },
              borderRadius: '9999px',
              px: 3,
            }}
          >
            Export PDF
          </Button>
        </div>
      </section>

      {/* Original display content - unchanged */}
      <div className="flex flex-col gap-6 px-6">
        
        {/* KPI Cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-3xl font-bold text-zinc-900">{rows.length}</p>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mt-2">Total Reports</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-3xl font-bold text-zinc-900">{Math.round(rows.filter(r => r.age).reduce((sum, r) => sum + r.age, 0) / rows.filter(r => r.age).length)}</p>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mt-2">Avg Age</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-3xl font-bold text-zinc-900">{rows.filter(r => r.age && r.age < 100).length}</p>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mt-2">Active</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-3xl font-bold text-zinc-900">{Math.round((rows.filter(r => r.age).length / rows.length) * 100)}%</p>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mt-2">Completion</p>
          </div>
        </section>

        {/* Gauges */}
        <section>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <h2 className="text-lg font-semibold text-zinc-900 mb-4">Performance Metrics</h2>
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="text-center">
                <Gauge width={120} height={120} value={65} />
                <p className="text-sm text-zinc-600 mt-2">Efficiency</p>
              </div>
              <div className="text-center">
                <Gauge width={120} height={120} value={85} />
                <p className="text-sm text-zinc-600 mt-2">Quality</p>
              </div>
              <div className="text-center">
                <Gauge width={120} height={120} value={45} />
                <p className="text-sm text-zinc-600 mt-2">Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Charts */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900">Monthly Report Output</h2>
            <BarChart
              height={300}
              series={[
                { data: [18, 24, 20, 27], label: 'Generated' },
                { data: [12, 19, 17, 23], label: 'Completed' },
              ]}
              xAxis={[{ data: ['January', 'February', 'March', 'April'], scaleType: 'band' }]}
              yAxis={[{ label: 'Count' }]}
            />
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900">Report Category Share</h2>
            <div className="flex justify-center">
              <PieChart
                height={250}
                series={[{
                  data: [
                    { id: 0, value: 35, label: 'Sales' },
                    { id: 1, value: 44, label: 'Development' },
                    { id: 2, value: 21, label: 'Marketing' },
                  ],
                }]}
              />
            </div>
          </div>
        </section>

        {/* Users Table */}
        <section>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900">Report Data Table</h2>
            <div style={{ height: 400 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
              />
            </div>
          </div>
        </section>

        {/* Map */}
        <section>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900">Report Locations Map</h2>
            <div className="h-[400px] w-full rounded-xl overflow-hidden">
              <MapContainer
                center={[14.5995, 120.9842]}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[14.5995, 120.9842]}>
                  <Popup>Manila - Report Hub</Popup>
                </Marker>
                <Marker position={[14.5547, 121.0244]}>
                  <Popup>Makati - Sales Office</Popup>
                </Marker>
                <Marker position={[14.6368, 121.0339]}>
                  <Popup>Quezon City - Dev Center</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReportsPage;