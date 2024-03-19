import { Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import AddTask from "../pages/AddTask";
import EditTask from "../pages/EditTask";

function MyRouter() {
    return(
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/add-task' element={<AddTask/>}></Route>
            <Route path='/:id/edit' element={<EditTask/>}></Route>
        </Routes>
    )
}

export default MyRouter;