import { useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const reducer = (state, action) => {

    switch (action.type) {
        case "ADD_TODO":
            return { ...state, todos: [...state.todos, action.payload] }
        case "EDIT_TODO":
            return {
                ...state, todos: state.todos.map((todo, index) => {
                    return (
                        index === action.index ? action.payload : todo
                    )
                })
            }
        case "DELETE_TODO":
            return { ...state, todos: state.todos.filter((_, index) => index !== action.payload) }
        default:
            return state
    }

}


const CustomTodoList = () => {

    const initial = {
        todos: []
    }
    const [current, dispatch] = useReducer(reducer, initial)
    const [enterTodo, setEnterTodo] = useState("")
    const [editTodo, setEditTodo] = useState("")
    const [editIndex, setIndex] = useState(null)
    // const [deleteTodo, setDeleteTodo] = useState(null)

    const clickToChange = (event) => {
        setEnterTodo(event.target.value)
    }

    const clickToUpdate = (todo, index) => {
        setEnterTodo(todo)
        setEditTodo(todo)
        setIndex(index)
    }
    const ClickToSubmit = (event) => {
        event.preventDefault()

        if (enterTodo && !/\d$/.test(enterTodo)) {
            if (editIndex !== null) {
                dispatch({
                    type: "EDIT_TODO",
                    index: editIndex,
                    payload: enterTodo
                })
                setIndex(null)
                setEditTodo("")
            } else {
                dispatch({
                    type: "ADD_TODO",
                    payload: enterTodo
                })
            }
            setEnterTodo("")
        }
    }
    const clickToDelete = (index) => {
        dispatch({
            type: "DELETE_TODO",
            payload: index
        })
    }
    return (
        <div>
            <Form>
                <Form.Group className="m-4 w-2" controlId="formBasicCheckbox">
                    <Form.Control type="text" placeholder="Enter text" value={enterTodo} onChange={clickToChange} />
                </Form.Group>
                <Button variant="primary" onClick={ClickToSubmit}>
                    {editIndex !== null ? "update" : "submit"}
                </Button>
            </Form>
            {
                current.todos.map((todo, index) => {
                    return (
                        <div key={index}>
                            <h1>{todo}</h1>
                            <Button variant="primary" onClick={() => clickToUpdate(todo, index)}>
                                Update
                            </Button>
                            <Button variant="primary" onClick={() => clickToDelete(index)}>
                                Delete
                            </Button>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default CustomTodoList