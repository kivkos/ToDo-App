import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';

import { useDeleteTodoMutation, useUpdateTodoMutation } from '../api/apiSlice';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Todo(props) {

    const [ deleteTodo ] = useDeleteTodoMutation();
    const [ updateTodo ] = useUpdateTodoMutation();

    const { todo } = props;

    const handleDelete = () => {
        deleteTodo( {id: todo.id});
        alert("Task successfully deleted!")
    } 

    const handleCheckboxChange = () => {
        console.log(todo.completed)
        updateTodo({ ...todo, completed: !todo.completed });
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} justifyContent={'center'}>
            <Grid item xs={8}>
                <Item sx={{ m: 1 }}>
                    <List>
                        <ListItem secondaryAction={
                            <>
                                <Link to={`/${todo.id}/edit`}>
                                    <IconButton sx={{ marginRight: 1 }} edge="end" aria-label="edit">
                                        <EditOutlinedIcon />
                                    </IconButton>
                                </Link>
                                <IconButton onClick={handleDelete} edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }>
                            <ListItemAvatar>
                                <Checkbox checked={todo.completed} onChange={handleCheckboxChange}  />                                            
                            </ListItemAvatar>
                            <ListItemText
                                primary={todo.title}
                                secondary={todo.description}
                            />
                        </ListItem>
                    </List>
                </Item>
            </Grid>
        </Grid>
    </Box>
);
}             

export default Todo;
