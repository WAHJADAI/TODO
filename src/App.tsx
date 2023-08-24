import { item } from './todo'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [todos,setTodos]=useState<item[]>(()=>{
    const loadTodos =localStorage.getItem("todos");
    if (loadTodos){
      return JSON.parse(loadTodos)
    }else return [];
  });
  const [task,setTask]=useState<string>("")
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
  return (
    <div>
      <div>
        <h1>TODO LIST</h1>
      <div>Add Task</div>
      <input type="text" name="task"  onChange={(e)=>setTask(e.currentTarget.value)}/>
      <button onClick={handleAddTask}>Add</button>
      <ul>
        {todos.map((todo)=>(
          
          <li key={todo.id}><input type="checkbox" onClick={()=>handleToggle(todo.id)} defaultChecked={todo.complete}/>{todo.text}<button >Edit</button><button onClick={()=>handleDeleteTask(todo.id)}>delete</button></li>
        ))}
      </ul>
      </div>
    

      
    </div>
  )
}

export default App
