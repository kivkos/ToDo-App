import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Loading from '../components/Loading';

import TopBar from '../components/TopBar';
import { Link, useNavigate } from 'react-router-dom';
import { useAddTodoMutation } from '../api/apiSlice';

function AddTask() {
    
    const navigate = useNavigate();
    const [inputErrorList, setInputErrorList] = useState('');
    const [loading, setLoading ] = useState(false); 

    const [addTodo] = useAddTodoMutation();

    const [ todo, setTodo] = useState({
        title: '',
        description: '',
        completed: false
    })

    const handleInput = (e) => {
        e.persist();
        setTodo({...todo, [e.target.name]: e.target.value })
    }

    const saveTodo = (e) => {        
        e.preventDefault();
        setLoading(true);
        
        if (todo.title!=="") {
            addTodo(todo)
            alert("Task created sucessfully!")
            setLoading(false);            
            navigate("/");
        } else {
            setInputErrorList("Task title  can not be empty. ")
            setLoading(false);
        }
        
    }

    if (loading) {
        return <Loading />;
    }

    return(
        <div>
            <TopBar title="Add Task"/>        
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, maxWidth: '50%' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                noValidate
            >        
                <TextField 
                    fullWidth 
                    id="filled-basic" 
                    label="Task title" 
                    variant="filled" 
                    name="title"
                    onChange={handleInput}
                    value={todo.title} 
                />
                <label>{inputErrorList}</label>
                <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    variant="filled" 
                    label="Task description"
                    multiline
                    rows={4}
                    name="description"
                    onChange={handleInput}
                    value={todo.description}
                />
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={saveTodo} >Save</Button>
                    <Link to="/"><Button variant="outlined">Cancel</Button></Link>
                </Stack>
            </Box>
        </div>
    )
}

export default AddTask;