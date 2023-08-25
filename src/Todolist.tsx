import  { useEffect, useState } from 'react'
import { item } from './todo';
import { styled } from 'styled-components';
 const EditTaskContainer =styled.div`
 position: fixed;
 top: 0;
 left: 0;
 z-index: 999;
 width: 100vw;
 height: 100vh;
 background-color: black;
 background-color: rgba(0, 0, 0, 0.75);
 `;
 const PopupCard =styled.div`
 width: 300px;
 position: absolute;
 left: 50%;
 top: 50%;
 margin-left: -150px;
 background-color: white;
 padding: 40px;
 transform: translateY(-50%);
 `;
export function Todolist(){
    const [todos,setTodos]=useState<item[]>(()=>{
        const loadTodos =localStorage.getItem("todos");
        if (loadTodos){
          return JSON.parse(loadTodos)
        }else return [];
      });
      const [task,setTask]=useState<string>("")
      const [taskUpdate,setTaskUpdate]=useState<string>("")
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
      function handleOpenEditTask(Task:item){
        if(!isEditing){setCurrentTask({...Task})}
        setIsEditing(!isEditing)
        console.log(currentTask)
      }
      function handleCloseEditTask(){
        setIsEditing(false)
      }
      function handleUpdateTask(){
        setTodos(todos.map((todo)=>{
            if(todo.id === currentTask?.id){
              return {...todo,text: taskUpdate}
            }
            return todo
          }))
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
          
          <li key={todo.id}><input type="checkbox" onClick={()=>handleToggle(todo.id)} defaultChecked={todo.complete}/>{todo.text}<button onClick={()=>handleOpenEditTask(todo)}>Edit</button><button onClick={()=>handleDeleteTask(todo.id)}>delete</button></li>
        ))}
        
      </ul>
      <div>
        {isEditing &&(
            
            <EditTaskContainer>
                <PopupCard><form onSubmit={handleUpdateTask}>
                <div>Edit task</div>
                <input type="text" name="EditTask"  onChange={(e)=>setTaskUpdate(e.currentTarget.value)} required/>
            <button type='submit'>Update</button><button onClick={handleCloseEditTask}>close</button>
                </form></PopupCard>
                
                
            </EditTaskContainer>
        )}
      </div>
      </div>
    
        </div>
    )
}