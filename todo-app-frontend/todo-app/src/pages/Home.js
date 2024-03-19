import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

import Todo from '../components/Todo';
import Loading from '../components/Loading';
import TopBar from '../components/TopBar';

function Home() {
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/todos`)
            .then(res => {
                setTodos(res.data.todos);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/todos/${id}/delete`)
            .then(res => {
                alert(res.data.message);
                setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
            })
            .catch(error => {
                console.error('Error deleting todo:', error);
                alert('An error occurred while deleting the todo.');
            });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
             <TopBar title="To-Do List"/>
            {todos.map(todo => (
                <Todo key={todo.id} todo={todo} onDelete={() => handleDelete(todo.id)} />
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Link to="/add-task">
                        <Fab color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Link>
                </Box>
            </Box>
        </div>
    );
}

export default Home;
