import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useGetTodosQuery } from '../api/apiSlice';

import Todo from '../components/Todo';
import Loading from '../components/Loading';
import TopBar from '../components/TopBar';

function Home() {

    const { data: todos, isLoading, isSuccess, isError, error} = useGetTodosQuery();
   
    let content;
    if (isLoading) {
        return <Loading />;
    } else if (isSuccess) {
        content = todos.todos;
    } else if (isError) {
        content = <p>{error.message}</p>
    }

    return (
        <div>
             <TopBar title="To-Do List"/>
             {content.map(todo => { 
                return (
                    <Todo todo={todo}/>
                )
            })}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ 
                position: 'fixed',
                bottom: '5%', 
                right: '15%'
                }}>
                    <Link to="/add-task">
                        <Fab  color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Link>
                </Box>
            </Box>
        </div>
    );
}
export default Home;
