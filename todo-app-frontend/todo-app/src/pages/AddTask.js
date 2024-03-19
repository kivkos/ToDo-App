import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import Loading from '../components/Loading';

import TopBar from '../components/TopBar';
import { Link, useNavigate } from 'react-router-dom';

function AddTask() {
    
    const navigate = useNavigate();
    const [inputErrorList, setInputErrorList] = useState('');
    const [loading, setLoading ] = useState(false); 

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

        const data = {
            title: todo.title,
            description: todo.description,
            completed: false
        }

        axios.post(`http://localhost:8000/api/todos/`, data)
        .then( res => {
            alert(res.data.message);
            navigate("/");
            setLoading(false);
        })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    setInputErrorList(error.response.data.errors);
                    setLoading(false);          
                }
                if (error.response.status === 500) {
                    alert(error.response.data.errors);
                    setLoading(false);  
                }
            }
        });
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
                autoComplete="off"
            >        
                <TextField 
                    fullWidth id="outlined-basic" 
                    label="Task title" 
                    variant="outlined" 
                    name="title"
                    onChange={handleInput}
                    value={todo.title}       
                />
                <p>{inputErrorList.title}</p>
                <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Task description"
                    multiline
                    rows={4}
                    name="description"
                    onChange={handleInput}
                    value={todo.description}
                />
                <span className='text-danger'>{inputErrorList.description}</span>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={saveTodo} >Save</Button>
                    <Link to="/"><Button variant="outlined">Cancel</Button></Link>
                </Stack>
            </Box>
        </div>
    )
}

export default AddTask;