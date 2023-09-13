import React from "react";
import "../Todo/todo.scss";
import { useMutation, useQuery } from "react-query";
import { useService } from "../API/Services";
import { FadeLoader } from "react-spinners";

export function Todo() {
    const [todos, setTodos] = React.useState([]);
    const [isEdit, setIsEdit] = React.useState(false);
    const { useTodosService } = useService();


    const { data: todosData, isRefetching: refetchTodosData, isLoading: datasIsLoading } = useQuery("getAllTodos", () => {
        useTodosService.getAllTodos().then(({ data }) => setTodos(data)).catch((err) => console.log(err))
    })

    const { mutateAsync: mutateNewTodos, isLoading: mutateIsLoading } = useMutation((requestBody) => {
        return useTodosService.createNewTodos(requestBody).catch((err) => console.log(err))
    })

    const handleSetTodo = (e) => {

        let check = e.target[0].value.trim();

        if (check === "") {
            alert("Input is empty! Please, Enter the input");
            e.preventDefault();
        }
        else {
            e.preventDefault();
            const newTodo = { id: e.timeStamp.toFixed(0), title: e.target[0].value }
            mutateNewTodos(newTodo)
            setTodos(prev => [...prev, newTodo]);
            e.target[0].value = " ";
        }
    }

    const handleInputChange = ({ target: { value } }, idx) => {
        setTodos((previous) => {
            const oldData = [...previous];
            const updateItem = { ...previous[idx] }
            updateItem.title = value;
            oldData[idx] = updateItem;
            return oldData
        })
    }

    const handleEditTodo = () => {
        setIsEdit(!isEdit);
    }

    const handleRemoveTodo = (id) => { setTodos((t) => t.filter((item) => item.id !== id)) }

    if (datasIsLoading || mutateIsLoading) {
        return <FadeLoader color="#36d7b7" />
    }

    return (
        <div className="todo">
            <div className="header">
                <i className="fa-solid fa-file-lines"></i>
                <h1>👉 Add Your List Here 👇</h1>
            </div>

            <form onSubmit={handleSetTodo} id="form">
                <h3>Add Todo</h3>
                <input className="input" type="text" placeholder="  Add Item..." />
                <button className="add" type="submit">Add</button>
            </form>

            <ul>
                {todos.length ? (
                    <div>
                        {todos.map(({ title, id }, idx) => (
                            <li key={id}>
                                <div className="listText">
                                    {isEdit ? <input className="input" type="text" placeholder="Edit text" onChange={(e) => handleInputChange(e, idx)} /> : <p>{title}</p>}
                                </div>
                                <div className="btns">
                                    <button className="blue btn" onClick={() => handleEditTodo()}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>

                                    <button className="red btn" onClick={() => handleRemoveTodo(id)}>
                                        <i className="fa-regular fa-trash-can"></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </div>
                ) : (
                    <li style={{ justifyContent: "center", fontSize: "25px" }}> İt is empty! Please enter the input</li>
                )}
            </ul>
        </div>
    );
};