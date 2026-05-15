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
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';

const blankForm = {
  name: '',
  title: '',
  image: '',
  content: '',
  isPublished: true,
};

// Sample initial articles data
const initialArticles = [
  {
    id: 1,
    name: 'learn-react',
    title: 'Learn React',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    content: 'React is a JavaScript library for building user interfaces.',
    isPublished: true,
  },
  {
    id: 2,
    name: 'learn-node',
    title: 'Learn Node.js',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
    content: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
    isPublished: true,
  },
  {
    id: 3,
    name: 'learn-mongodb',
    title: 'Learn MongoDB',
    image: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=400&h=300&fit=crop',
    content: 'MongoDB is a NoSQL document database that uses JSON-like documents.',
    isPublished: true,
  },
];

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [articles, setArticles] = useState(initialArticles);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState({ ...blankForm });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Define handleDelete before columns
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  const openEditModal = (article) => {
    setForm({
      name: article.name || '',
      title: article.title || '',
      image: article.image || '',
      content: article.content || '',
      isPublished: article.isPublished !== undefined ? article.isPublished : true,
    });
    setModal({ open: true, id: article.id });
    setErrors({});
  };

  // Define columns after handleDelete and openEditModal
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Slug', width: 150 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'image', headerName: 'Image URL', width: 200 },
    {
      field: 'isPublished',
      headerName: 'Published',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Published' : 'Draft'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button 
            size="small" 
            variant="outlined" 
            onClick={() => openEditModal(params.row)}
          >
            Edit
          </Button>
          <Button 
            size="small" 
            variant="outlined" 
            color="error" 
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  // Filter articles based on search and status
  let filteredArticles = [...articles];
  
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase().trim();
    filteredArticles = filteredArticles.filter(article => 
      article.title?.toLowerCase().includes(term) ||
      article.name?.toLowerCase().includes(term)
    );
  }
  
  if (statusFilter) {
    const isPublished = statusFilter === 'published';
    filteredArticles = filteredArticles.filter(article => article.isPublished === isPublished);
  }

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (article = null) => {
    if (article) {
      openEditModal(article);
    } else {
      resetForm();
      setModal({ open: true, id: null });
      setErrors({});
    }
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
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
    
    if (!form.name.trim()) {
      newErrors.name = 'Slug/URL name is required';
    } else if (form.name.includes(' ')) {
      newErrors.name = 'Slug must not contain spaces (use hyphens instead)';
    }
    
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.image.trim()) newErrors.image = 'Image URL is required';
    if (!form.content.trim()) newErrors.content = 'Content is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    const articleData = {
      name: form.name.trim().toLowerCase().replace(/\s/g, '-'),
      title: form.title.trim(),
      image: form.image.trim(),
      content: form.content.trim(),
      isPublished: form.isPublished,
    };
    
    if (modal.id) {
      // Update existing article
      setArticles(articles.map(article => 
        article.id === modal.id ? { ...articleData, id: modal.id } : article
      ));
    } else {
      // Create new article
      const newId = Math.max(0, ...articles.map(a => a.id), 0) + 1;
      setArticles([...articles, { ...articleData, id: newId }]);
    }
    closeModal();
  };

  return (
    <Box sx={{ width: '100%', minWidth: 0, p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h4">Articles Management</Typography>
        <Button variant="contained" onClick={() => openModal()} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Add Article
        </Button>
      </Box>

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search by title or slug..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {/* Filter */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            fullWidth
            size="small"
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
          </TextField>
        </Stack>

        {filteredArticles.length ? (
          <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredArticles}
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
            No articles found. Use Add Article to create your first article.
          </Alert>
        )}
      </Paper>

      {/* Add/Edit Article Dialog */}
      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit Article' : 'Add New Article'}</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField
                label="Slug / URL Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name || "Use hyphens instead of spaces (e.g., 'my-article-title')"}
                fullWidth
                required
              />

              <TextField
                label="Article Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
                fullWidth
                required
              />

              <TextField
                label="Image URL"
                name="image"
                value={form.image}
                onChange={handleChange}
                error={!!errors.image}
                helperText={errors.image || "Enter a valid image URL"}
                fullWidth
                required
                placeholder="https://images.unsplash.com/..."
              />

              <TextField
                label="Article Content"
                name="content"
                value={form.content}
                onChange={handleChange}
                error={!!errors.content}
                helperText={errors.content}
                fullWidth
                multiline
                rows={6}
                required
              />

              <FormControlLabel
                control={
                  <Switch
                    name="isPublished"
                    checked={form.isPublished}
                    onChange={handleChange}
                  />
                }
                label="Publish Article"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Save Changes' : 'Create Article'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;