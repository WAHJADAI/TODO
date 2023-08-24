import { item } from './todo'
import './App.css'
import { useState } from 'react'

function App() {
  const [todos,setTodos]=useState<item[]>([]);
  const [task,setTask]=useState<string>("")
  function handleAddTask (){
    const newTask:item ={id:Date.now(),text:task,complete:false}
    setTodos([...todos,newTask])
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
          
          <li key={todo.id}><input type="checkbox" key={todo.id} />{todo.text}<button>delete</button></li>
        ))}
      </ul>
      </div>
    

      
    </div>
  )
}

export default App
