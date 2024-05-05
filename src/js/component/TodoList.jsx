import { element } from "prop-types";
import React, { startTransition, useEffect, useState } from "react";
import'../../styles/toDoList.css';
import { Spinner } from "./Spinner";

export const TodoList = () => {


    const [task, setTask] = useState('');
    const [edit, setEdit] = useState (false);
    const [list, setList] = useState([]);
    const [currentTodo, setCurrentTodo] = useState({})
    
    const host = "https://playground.4geeks.com/todo"
    const user = 'meryalvhe'

    const getTodo = async () => {
        const uri = `${host}/users/${user}`
        const options = {};           
        
        const response = await fetch (uri, options)
        if (!response.ok){
            console.log('Error', response.status);
            return
        }
        const data = await response.json()
        console.log(data);
        setList(data.todos)
   
    }

    
    const createTodo = async (todo) => {
        const uri = `${host}/todos/${user}`
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(todo)
        }

        const response = await fetch(uri, options)
        if (!response.ok){
            console.log('Error', response.status);
            return
        }
        const data = await response.json()
        setTask('');
        getTodo()
      
   
    } 
    
    
    useEffect (()=> {
         getTodo ();
    },[])



    const handleEditTodo = async (event) =>{
        event.preventDefault()
        const dataToSend ={
            label: currentTodo.label,
            is_done: currentTodo.is_done
        }
        const uri = `${host}/todos/${currentTodo.id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(dataToSend)
        }
        const response = await fetch (uri, options)
        if (!response.ok){
            console.log ('Error: ', response.status , response.statusText)
            return
        }
        const data = await response.JSON()
        getTodo()
        setCurrentTodo({})
        setEdit(false)
        
        
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        if (task.trim() !== ''){
            const newTodo = {
                label: task,
                is_done: false
            }
            createTodo(newTodo) 
            // setList([...list, task]);
            
        } else{
            setTask('')
        }
    }

    const deleteTask = async (item) => {
        setList(list.filter((element) => element !== item))
        const uri =`${host}/todos/${item.id}`
        const option ={
            method: 'DELETE',
        }
        const response = await fetch (uri, option);
        if (!response.ok){
            console.log('Error', response.status, response.statusText)
            return
        }
        getTodos();


    } 
    const editTask = (item) => {
        setCurrentTodo(item);
        setEdit(true)
    }
    const resetEdit = () => {
        setCurrentTodo[{}]
        setEdit(false)
    }

    return(
        <div className="container col-10 col-sm-8 col-md-6 mt-3">
            <h1 className="text-primary fw-bold" > TO DO LIST </h1>
            { !list ? 
             <Spinner/> : <div className= 'text-start mt-2'>
            { edit ? 
            <form onSubmit={handleEditTodo}>
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label text-success fw-bold"> Editar tarea: </label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="task" value= {currentTodo.label} onChange= {(event) => setCurrentTodo({... currentTodo, label: event.target.value})}/>
            </div>
            <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked= {currentTodo.is_done} onChange = {(event)=> setCurrentTodo ({...currentTodo, is_done: event.target.checked})}/>
                    <label class="form-check-label" for="flexCheckDefault">
                        Completed
                    </label>
                 </div>
                 <button type="submit" class="btn btn-primary">Submit</button>
                 <button type="reset" onClick= {resetEdit} class="btn btn-primary">Cancel</button>
            </form> :
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label text-success fw-bold"> Tareas pendientes: </label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="task" value= {task} onChange= {(event) => setTask(event.target.value)}/>
                </div>
                
            </form>
            }
            <ul className="list-group">
                {list.map((item, id) => <li key={id} className="list-group-item d-flex justify-content-between hidden-icon">
                    {item.label}
                    <span>
                    <i className="far fa-edit"onClick= {()=> editTask(item)}></i>
                    <i className="fas fa-times text-secondary" onClick= {()=> deleteTask(item)}></i>
                    </span>
                </li>)}
                <li className="list-group-item list-group-item-primary text-end fw-lighter">
                    {list.length} items
                </li>
            </ul>


            </div>


            }


        </div>
    )
}