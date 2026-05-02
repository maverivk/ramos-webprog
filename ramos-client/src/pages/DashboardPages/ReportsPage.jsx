import { BarChart, PieChart } from '@mui/x-charts';

const ReportsPage = () => {
  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-6 py-6">
        <h1 className="text-3xl font-bold text-zinc-900">Reports</h1>
        <p className="text-sm text-zinc-600 mt-2">
          Detailed analytics and insights
        </p>
      </section>

      {/* Charts */}
      <section className="grid gap-6 md:grid-cols-2 px-6">

        <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Monthly Data</h2>
          <BarChart
            height={300}
            series={[
              { data: [5, 10, 15, 20], label: '2025' },
              { data: [8, 12, 18, 25], label: '2026' }
            ]}
            xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr'], scaleType: 'band' }]}
          />
        </div>

        <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900">Category Share</h2>
          <PieChart
            height={300}
            series={[{
              data: [
                { id: 0, value: 30, label: 'Design' },
                { id: 1, value: 50, label: 'Development' },
                { id: 2, value: 20, label: 'Marketing' }
              ]
            }]}
          />
        </div>

      </section>

    </div>
  );
};

export default ReportsPage;