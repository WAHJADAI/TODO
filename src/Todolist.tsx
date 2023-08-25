import React, { useEffect, useState } from 'react'
import { item } from './todo';
 
export function Todolist(){
    const [todos,setTodos]=useState<item[]>(()=>{
        const loadTodos =localStorage.getItem("todos");
        if (loadTodos){
          return JSON.parse(loadTodos)
        }else return [];
      });
      const [task,setTask]=useState<string>("")
      const [isEditing,setIsEditing]=useState<boolean>(false)
      const [currentTask,setCurrentTask]=useState<item>()
      useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todos))
        console.log("👍")
      },[todos])
    
      function handleAddTask (){
        if(task !==""){const newTask:item ={id:Date.now(),text:task,complete:false}
        setTodos([...todos,newTask])}
        else alert("please write the Message.")
      }
      function handleDeleteTask (id:number){
        const deleteTask =todos.filter((todo)=>{return todo.id !==id})
        setTodos(deleteTask)
      }
      function handleToggle (id:number){
        setTodos(todos.map((todo)=>{
          if(todo.id === id){
            return {...todo,complete: !todo.complete}
          }
          return todo
        }))
      }
      function handleOpenEditTask(){
        setIsEditing(!isEditing)
      }
      function handleEditTask(id:number){

      }
    return(
        <div>
            <div>
        <h1>TODO LIST</h1>
        <div><div>Add Task</div>
      <input type="text" name="task"  onChange={(e)=>setTask(e.currentTarget.value)}/>
      <button onClick={handleAddTask}>Add</button></div>
      
      <ul>
        {todos.map((todo)=>(
          
          <li key={todo.id}><input type="checkbox" onClick={()=>handleToggle(todo.id)} defaultChecked={todo.complete}/>{todo.text}<button onClick={handleOpenEditTask}>Edit</button><button onClick={()=>handleDeleteTask(todo.id)}>delete</button></li>
        ))}
        
      </ul>
      <div>
        {isEditing &&(
            
            <div><input type="text" name="EditTask" />
            <button>agree</button><button onClick={handleOpenEditTask}>close</button>
            </div>
        )}
      </div>
      </div>
    
        </div>
    )
}