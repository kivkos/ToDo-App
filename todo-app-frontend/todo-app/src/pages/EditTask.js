import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Loading from '../components/Loading';
import { Link, useParams } from 'react-router-dom';

import TopBar from '../components/TopBar';

function EditTask(props) {
    
    //let { id } = useParams();

    const [loading, setLoading ] = useState(false); 

    const [ todo, setTodo] = useState({
        title: props.title,
        description: props.description,
        completed: false
    })

    const handleInput = (e) => {
        e.persist();
        setTodo({...todo, [e.target.name]: e.target.value })
    }

    const saveTodo = (e) => {
        e.preventDefault();
        setLoading(true);
    }

    if (loading) {
        return <Loading />;
    }

    return(
        <div>
            <TopBar title="Edit Task"/>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, maxWidth: '50%' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                noValidate
                autoComplete="off"
            >        
                <TextField 
                    fullWidth id="outlined-basic" 
                    label="Task title" 
                    variant="outlined" 
                    name="title"
                    onChange={handleInput}
                    value=" "              
                />
                <p>test: {todo.title}</p>
                <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Task description"
                    multiline
                    rows={4}
                    name="description"
                    onChange={handleInput}
                    value=" "
                />
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={saveTodo} >Save</Button>
                    <Link to="/"><Button variant="outlined">Cancel</Button></Link>
                </Stack>
            </Box>
        </div>
    )
}

export default EditTask;