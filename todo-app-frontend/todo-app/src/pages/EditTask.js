import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Loading from '../components/Loading';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGetTodoByIdQuery, useUpdateTodoMutation} from '../api/apiSlice'

import TopBar from '../components/TopBar';

function EditTask() {
    
    let { id } = useParams();
    const navigate = useNavigate();

    const [inputErrorList, setInputErrorList] = useState('');

    const { data: todoData, isLoading, isError, error } = useGetTodoByIdQuery(id);
    const [ updateTodo ] = useUpdateTodoMutation();
    
    const [ todo, setTodo] = useState({
        title: '',
        description: '',
        completed: false
    })
    
    useEffect(() => {
        if(todoData){
            setTodo(todoData.message);
        }
    }, [todoData]);

    if (isLoading) {
        return <Loading/>;
      }
    
    if (isError) {
        return <p>Error: {error.message}</p>;
      }

    const handleInput = (e) => {
        e.persist();
        setTodo({...todo, [e.target.name]: e.target.value })
    }

    const saveTodo = async (e) => {
        e.preventDefault();
        if (todo.title !== "") {
            try {
                await updateTodo({
                    id,
                    title: todo.title,
                    description: todo.description,
                    completed: todo.completed
                });
                alert("Task updated successfully!");
                navigate("/");
            } catch (error) {
                console.error("Error updating todo:", error);
            }
        } else {
            setInputErrorList("Task title can not be empty.");
        }
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
                    label="title"
                    variant="outlined" 
                    name="title"
                    onChange={handleInput}
                    value={todo.title}              
                />
                <p>{inputErrorList}</p>
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
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={saveTodo} >Save</Button>
                    <Link to="/"><Button variant="outlined">Cancel</Button></Link>
                </Stack>
            </Box>
        </div>
    )
}

export default EditTask;