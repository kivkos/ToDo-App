import * as React from 'react';
import { useState , useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import Loading from '../components/Loading';
import { Link, useParams } from 'react-router-dom';

import TopBar from '../components/TopBar';

function EditTask() {
    
    let { id } = useParams();


    const [inputErrorList, setInputErrorList] = useState('');
    const [loading, setLoading ] = useState(false); 

    const [ todo, setTodo] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/todos/${id}/edit`)
            .then(res => {
                setTodo(res.data.todo);
                setLoading(false);
            })
    }, [id]);

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
                <p>{inputErrorList.title}</p>
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
                <span className='text-danger'>{inputErrorList.description}</span>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={saveTodo} >Save</Button>
                    <Link to="/"><Button variant="outlined">Cancel</Button></Link>
                </Stack>
            </Box>
        </div>
    )
}

export default EditTask;