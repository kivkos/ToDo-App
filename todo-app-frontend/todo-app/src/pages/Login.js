import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

function Login() {

    return(
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, maxWidth: '10%' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',                
            }}
            noValidate
            autoComplete="off"
        >
            <Paper>
                <TextField fullWidth id="outlined-basic" label="Username" variant="outlined" />
                <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" />
                <Stack spacing={2} direction="row">
                    <Button variant="contained">Login</Button>
                </Stack>
            </Paper>        
        </Box>
    )

}

export default Login;