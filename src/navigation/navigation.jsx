import { BrowserRouter, Route, Routes } from "react-router-dom"
import CustomTodoList from "../components/todo-list/todo"





const CustomNavigation = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CustomTodoList/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default CustomNavigation