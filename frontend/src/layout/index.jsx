import { Box, Container } from '@mui/material'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

const LayoutContainer = () => {
    return (
        <Box component="main">
            <Toaster />
            <Container maxWidth="sm">
                <Box sx={{ background: '#B3B7EE', minHeight: '100vh', height: '100%' }}>
                    <Box sx={{ background: '#9395D3', p: '10px 20px' }}>
                        <h2 style={{ color: '#fff' }}>TODO APP</h2>
                    </Box>
                    <Box sx={{ p: '16px' }}>
                        <Outlet />
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default LayoutContainer