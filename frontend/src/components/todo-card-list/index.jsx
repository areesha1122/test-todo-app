import { Box, Button, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaCircleCheck, FaRegTrashCan } from 'react-icons/fa6'
import { GoPencil } from 'react-icons/go'
import apiClient from '../../helper/apiClient'
import { useNavigate } from 'react-router-dom'
import { CiCircleCheck } from 'react-icons/ci'
import toast from 'react-hot-toast'
import { AppLoader } from '../common/app-loader'
import { todoCardStyles } from './todo-card-style'

export const TodoCardsList = () => {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

  const getTodoItems = async () => {
    try {
      setLoading(true)
      const response = await apiClient.get("/api/todos?skip=0&limit=1000")
      setTasks(response?.data)
    } catch (error) {
      console.log(error, 'error')
      toast.error(error?.message)
    } finally {
      setLoading(false)
    }
  }

  // complete task
  const handleEditTask = async (item) => {
    navigate(`/edit-task/${item.id}`, { state: item })
  }

  const handleDeleteTask = async (id) => {
    try {
      setLoading(true)
      await apiClient.delete(`/api/todos/${id}`);
      await getTodoItems()
      toast.success('Task deleted successfully')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  const handleCompleteTask = async (item) => {
    try {
      const payload = {
        title: item?.title,
        description: item?.description,
        completed: true
      }
      setLoading(true)
      await apiClient.put(`/api/todos/${item.id}`, payload);
      await getTodoItems()
      toast.success('Task completed successfully')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTodoItems()
  }, []);

  return (
    <Box sx={todoCardStyles.container}>
      <Box sx={todoCardStyles.taskList}>
        {!loading && tasks?.length > 0 && tasks?.map((item, index) =>
          <Card key={index} sx={todoCardStyles.taskCard}>
            <div>
              <h3 style={todoCardStyles.title}>{item?.title}</h3>
              <h4 style={todoCardStyles.title}>{item?.description}</h4>
            </div>
            {!item.completed ?
              <Box sx={todoCardStyles.actions}>
                <GoPencil onClick={() => handleEditTask(item)} size={20} style={{ cursor: 'pointer' }} />
                <FaRegTrashCan onClick={() => handleDeleteTask(item?.id)} size={20} style={{ cursor: 'pointer' }} />
                <CiCircleCheck size={24} onClick={() => handleCompleteTask(item)} style={{ cursor: 'pointer' }} />
              </Box>
              :
              <Box sx={todoCardStyles.actions}>
                <FaRegTrashCan onClick={() => handleDeleteTask(item?.id)} size={20} style={{ cursor: 'pointer' }} />
                <FaCircleCheck size={24} />
              </Box>
            }
          </Card>
        )}
        {!loading && tasks?.length === 0 && <h3 style={todoCardStyles.noTasksMessage}>No Todo List found</h3>}
        {loading && <AppLoader />}
      </Box>
      <Button onClick={() => navigate('/add-task')} sx={todoCardStyles.addButton}>+</Button>
    </Box>
  )
}

