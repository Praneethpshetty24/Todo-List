import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Todo = () =>{
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');


useEffect(() => {
const StoredTasks = JSON.parse(localStorage.getItem('tasks')) || []
setTasks(StoredTasks)
}, [])

useEffect(() => {
localStorage.setItem('tasks',JSON.stringify(tasks))
}, [tasks]) 

const addTask = () =>{
    if(taskInput.trim() !==''){
        setTasks([...tasks,{id:Date.now(),text:taskInput,completed:false}])
        setTaskInput('')   
    
    }
}

const toggleTask = (taskId) =>{
    setTasks(tasks.map(task=> task.id === taskId ? {...task, completed:!task.completed}:task))
}

const deleteTask = (taskId) =>{
    setTasks(tasks.filter(task=>task.id !==taskId))

}


  return (
    <div className='Main'>
        <div>
            <div className='head'>
             <h1>TODO List</h1>
            </div>
      
      
        <div className='Cent'>
            <input type='text'
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder='Add a new task'/>
            <button onClick={addTask} className='button1'>Add</button>    
        </div>
        </div>
        <div className='Text'>
        <ul>
            {
                tasks.map(task =>(
                    <li key ={task.id}>
                        <input type='checkbox' checked={task.completed} onChange={() => toggleTask(task.id)}/>
                        <span style ={{textDecoration:task.completed ? 'line-through':'none'}}>{task.text}</span>
                        <button onClick={()=>deleteTask(task.id)} className='button2'>Delete</button>
                    </li>
                )

                )
            }

        </ul>
        </div>

    </div>
  )
  }

export default Todo