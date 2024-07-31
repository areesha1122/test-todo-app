import { TextField, Typography, Button, Box, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router-dom';
import apiClient from '../../helper/apiClient';
import toast from 'react-hot-toast';
import { CustomTextField } from '../common/textfield';

export const AddTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const task = location.state;

  const [title, setTitle] = useState(task?.title || '');
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState(task?.description || '');
  const [descriptionError, setDescriptionError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task?.title || '');
      setDescription(task?.description || '');
    }
  }, [task]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setIsChanged(event.target.value !== task?.title || description !== task?.description);
    if (event.target.value.length >= 3) {
      setTitleError(false);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setIsChanged(title !== task?.title || event.target.value !== task?.description);
    if (event.target.value.length >= 12) {
      setDescriptionError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title.length < 3) {
      setTitleError(true);
      return;
    }
    if (description.length < 12) {
      setDescriptionError(true);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        title,
        description,
        completed: task?.completed || false,
      };
      if (task) {
        await apiClient.put(`/api/todos/${task.id}`, payload);
        toast.success('To-Do task updated successfully');
      } else {
        await apiClient.post('/api/todos', payload);
        toast.success('To-Do task added successfully');
      }
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '10px', pb: 3 }}>
        <FaArrowLeft style={{ cursor: 'pointer', color: '#fff' }} onClick={() => navigate(-1)} />
        <Typography variant="h6" gutterBottom style={{ color: '#fff' }}>
          {task ? 'Edit Task' : 'Add Task'}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <CustomTextField
          label="Title"
          value={title}
          variant="filled"
          onChange={handleTitleChange}
          error={titleError}
          helperText={'Title is required and must be at least 3 characters.'}
          required
        />
        <CustomTextField
          label="Description"
          value={description}
          variant="filled"
          onChange={handleDescriptionChange}
          error={descriptionError}
          helperText={'Description is required and must be at least 12 characters.'}
          required
        />
        <Button
          type="submit"
          variant="contained"
          disabled={task ? !isChanged : false} // Disable button if no changes during edit
          sx={{ mt: 1, backgroundColor: '#9e9ece', '&:hover': { backgroundColor: '#9e9ece' }, width: '100%' }}
        >
          {!loading ? (task ? 'UPDATE' : 'ADD') : <CircularProgress size={24} color="inherit" />}
        </Button>
      </form>
    </Box>
  );
};
