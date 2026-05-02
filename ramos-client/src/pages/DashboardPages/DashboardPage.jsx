import { BarChart, PieChart, Gauge } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const rows = [
  { id: 1, firstName: 'Jon', lastName: 'Snow', age: 14 },
  { id: 2, firstName: 'Cersei', lastName: 'Lannister', age: 31 },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First Name', width: 150 },
  { field: 'lastName', headerName: 'Last Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 100 },
];

const pieData = [
  { id: 0, value: 35, label: 'A' },
  { id: 1, value: 44, label: 'B' },
];

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-6 py-6">
        <h1 className="text-3xl font-bold text-zinc-900">Dashboard</h1>
        <p className="text-sm text-zinc-600 mt-2">
          Overview of system performance
        </p>
      </section>

      {/* KPI */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 px-6">
        <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
          <p className="text-3xl font-bold text-zinc-900">{rows.length}</p>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mt-2">Users</p>
        </div>

        <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
          <p className="text-3xl font-bold text-zinc-900">27.5</p>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mt-2">Avg Age</p>
        </div>
      </section>

      {/* Gauges */}
      <section className="px-6">
        <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Performance</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <Gauge width={120} height={120} value={50} />
            <Gauge width={120} height={120} value={75} />
            <Gauge width={120} height={120} value={30} />
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="grid gap-6 md:grid-cols-2 px-6">
        <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Bar Chart</h2>
          <BarChart
            height={250}
            series={[{ data: [10, 20, 30, 40] }]}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
          />
        </div>

        <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Pie Chart</h2>
          <PieChart height={250} series={[{ data: pieData }]} />
        </div>
      </section>

      {/* Table */}
      <section className="px-6">
        <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Users</h2>
          <div style={{ height: 300 }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="px-6">
        <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Map</h2>
          <div className="h-[400px] w-full">
            <MapContainer center={[12.54321, 123.456789]} zoom={13} style={{ height: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[12.54321, 123.456789]}>
                <Popup>Sample Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DashboardPage;