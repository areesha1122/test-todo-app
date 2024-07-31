import { TextField } from '@mui/material'
import React from 'react'

export const CustomTextField = ({ label, value, onChange, error, helperText, fullWidth = true, ...rest }) => {
    return (
        <TextField
            label={label}
            value={value}
            variant="filled"
            onChange={onChange}
            error={error}
            helperText={error ? helperText : ''}
            fullWidth={fullWidth}
            {...rest}
            sx={{
                mb: 2,// Set background color to white
                '& .MuiFilledInput-root': {
                    backgroundColor: '#fff', // Background color for filled variant
                },
                '& .MuiFilledInput-root:hover': {
                    backgroundColor: '#fff', // Background color on hover
                },
                '& .MuiFilledInput-root.Mui-focused': {
                    backgroundColor: '#fff', // Background color on focus
                },
            }}
        />
    )
}
