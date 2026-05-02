import { DataGrid } from '@mui/x-data-grid';

const rows = [
  { id: 1, name: 'John Doe', email: 'john@email.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@email.com', role: 'User' },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'role', headerName: 'Role', width: 120 },
];

const UsersPage = () => {
  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-6 py-6">
        <h1 className="text-3xl font-bold text-zinc-900">Users</h1>
        <p className="text-sm text-zinc-600 mt-2">
          Manage user accounts and roles
        </p>
      </section>

      {/* Table */}
      <section className="px-6">
        <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        </div>
      </section>

    </div>
  );
};

export default UsersPage;