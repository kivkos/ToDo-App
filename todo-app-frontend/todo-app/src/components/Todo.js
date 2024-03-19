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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Todo(props) {
  
  return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} justifyContent={'center'}>
            <Grid item xs={8}>
                <Item sx={{ m: 1 }}>
                    <List>
                        <ListItem secondaryAction={
                            <>
                                <Link to={`/${props.todo.id}/edit`}>
                                    <IconButton sx={{ marginRight: 1 }} edge="end" aria-label="edit">
                                        <EditOutlinedIcon />
                                    </IconButton>
                                </Link>
                                <IconButton onClick={props.onDelete} edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }>
                            <ListItemAvatar>
                                <Checkbox {...label} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={props.todo.title}
                                secondary={props.todo.description}
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
