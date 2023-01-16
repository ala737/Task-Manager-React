import { useState, useEffect } from "react";
import { BrowserRouter as Router,Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
function App() {

  const [showAddTask,setShowAddTask] = useState(false)
  const [tasks,setTasks]= useState([]);

  useEffect(()=>{
     const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)

     }


      getTasks();
  }, [] )

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json();

    return data
  }



  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json();

    return data
  }

const addTask = async (task) =>{
  const res = await fetch('http://localhost:5000/tasks',
  {
    method:'POST',
 
  headers:{
    'Content-type': 'application/json'
  }, 
   body: JSON.stringify(task),  
 })

 const data = await res.json()

 setTasks([...tasks, data])
  
  
  
  
  /*const id = Math.floor(Math.random() * 1000) + 1;

  const newTask = {id, ...task}

  setTasks([...tasks,newTask])*/
}

const deleteTask = async (id) =>{
  await fetch(`http://localhost:5000/tasks/${id}`,
    { method : 'DELETE',}
  )
  setTasks(tasks.filter((task) => task.id !== id));
}
const toggleReminder = async (id) =>{
  const taskToTaggle = await fetchTask(id);
  const updTask = {...taskToTaggle,reminder: !taskToTaggle.reminder}
   
  console.log(updTask)

  setTasks(tasks.map((task) => task.id === id 
  ? {...task,reminder: !task.reminder} : task ))
}

  return (
  
    <div className="container">
      <Header title="Tasks Tracker" onAdd={() => setShowAddTask(!showAddTask)} TextButton={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ?
        <Tasks  tasks={tasks} onDelete={deleteTask}
           onToggle={toggleReminder}
        />
       : 'No Tasks for the day!'
      }
    
    </div>

  )
}

export default App;
