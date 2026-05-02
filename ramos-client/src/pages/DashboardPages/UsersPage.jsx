import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../assets/users.json?raw';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) => value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const loadUsers = () => {
  try {
    // usersSeed is already a string from the ?raw import
    const parsed = JSON.parse(usersSeed);
    return {
      users: parsed.map((user, index) => ({
        id: index + 1,
        firstName: String(user.firstName ?? '').trim(),
        lastName: String(user.lastName ?? '').trim(),
        age: String(user.age ?? '').trim(),
        gender: String(user.gender ?? '').trim(),
        contactNumber: String(user.contactNumber ?? '').trim(),
        email: String(user.email ?? '').trim(),
        role: roles.includes(String(user.role ?? '').trim().toLowerCase()) ? String(user.role ?? '').trim().toLowerCase() : 'editor',
        username: String(user.username ?? '').trim().toLowerCase(),
        password: String(user.password ?? ''),
        address: String(user.address ?? '').trim(),
        isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
      })),
      error: null,
    };
  } catch (e) {
    console.error('Error parsing users.json:', e);
    return {
      users: [],
      error: 'Unable to read users from src/assets/users.json.',
    };
  }
};

const seed = loadUsers();

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 130, editable: true },
  { field: 'lastName', headerName: 'Last Name', width: 130, editable: true },
  { field: 'age', headerName: 'Age', width: 80, editable: true, type: 'number' },
  { field: 'gender', headerName: 'Gender', width: 100, editable: true },
  { field: 'email', headerName: 'Email', width: 200, editable: true },
  { field: 'contactNumber', headerName: 'Phone', width: 150, editable: true },
  { field: 'role', headerName: 'Role', width: 100, editable: true },
  { field: 'username', headerName: 'Username', width: 130, editable: true },
  { field: 'address', headerName: 'Address', width: 200, editable: true },
  {
    field: 'isActive',
    headerName: 'Active',
    width: 80,
    renderCell: (params) => (
      <Chip
        label={params.value ? 'Active' : 'Inactive'}
        color={params.value ? 'success' : 'default'}
        size="small"
      />
    ),
  },
];

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [users, setUsers] = useState(seed.users || []);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState({ ...blankForm });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const openModal = (user = null) => {
    if (user) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        age: user.age || '',
        gender: user.gender || '',
        contactNumber: user.contactNumber || '',
        email: user.email || '',
        role: user.role || 'editor',
        username: user.username || '',
        password: '',
        address: user.address || '',
        isActive: user.isActive !== undefined ? user.isActive : true,
      });
      setModal({ open: true, id: user.id });
    } else {
      resetForm();
      setModal({ open: true, id: null });
    }
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    setShowConfirmPassword(false);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!form.username.trim()) newErrors.username = 'Username is required';
    if (!modal.id && !form.password) {
      newErrors.password = 'Password is required for new users';
    } else if (!modal.id && form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!modal.id && form.password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (form.age && (isNaN(form.age) || form.age < 0 || form.age > 150)) {
      newErrors.age = 'Age must be between 0 and 150';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    const userData = {
      id: modal.id || Math.max(0, ...users.map(u => u.id), 0) + 1,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age,
      gender: form.gender,
      contactNumber: form.contactNumber,
      email: form.email.trim(),
      role: form.role,
      username: form.username.trim().toLowerCase(),
      password: modal.id ? (form.password || users.find(u => u.id === modal.id)?.password || '') : form.password,
      address: form.address,
      isActive: form.isActive,
    };
    
    if (modal.id) {
      setUsers(users.map(u => u.id === modal.id ? userData : u));
    } else {
      setUsers([...users, userData]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <Box sx={{ width: '100%', minWidth: 0, p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" onClick={() => openModal()} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Add User
        </Button>
      </Box>

      {seed.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {seed.error}
        </Alert>
      )}

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        {users.length ? (
          <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={users}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 15]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              sx={{
                minWidth: 0,
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                  outline: 'none',
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            No users found. Use Add User to create your first record.
          </Alert>
        )}
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  fullWidth
                  required
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  fullWidth
                  required
                />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Age"
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                  error={!!errors.age}
                  helperText={errors.age}
                  fullWidth
                />
                <TextField
                  select
                  label="Gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  fullWidth
                >
                  {genders.map((option) => (
                    <MenuItem key={option} value={option}>
                      {labelize(option)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                required
              />

              <TextField
                label="Phone Number"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                fullWidth
                required
              />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <TextField
                select
                label="Role"
                name="role"
                value={form.role}
                onChange={handleChange}
                fullWidth
              >
                {roles.map((option) => (
                  <MenuItem key={option} value={option}>
                    {labelize(option)}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
              />

              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label="Active User"
              />

              {modal.id && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    closeModal();
                    handleDelete(modal.id);
                  }}
                  sx={{ mt: 1 }}
                >
                  Delete User
                </Button>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Save Changes' : 'Create User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;