import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;


function TaskManager() {

    const [input, setInput] = useState({ title: "", description: "",dueDate:"" });
    const [error,setError] = useState("");
    const navigate = useNavigate();
    const [tasks,setTasks] = useState([]);
    const token = localStorage.getItem('token');
    const [loading,setLoading] = useState(true);

    useEffect(()=>{fetchTask();},[]);

    const fetchTask = async()=>{
        try {
        console.log("fetch response ");

            const res = await axios.get(`${API_URL}/tasks`,{headers:{
                Authorization:`Bearer ${token}`
            }}
            );

        const data = await res.data;
        setTasks(data);
        // console.log("fetch data ",data);

        } catch (error) {
            setError('Could not load tasks. Please try again later.');
            console.log(error.message);
        }finally{
          setLoading(false);
        }

        if(loading) return <p>Loading...</p>


    }

    const handleChange = (event) => {
      let { name,value } = event.target;
      setInput((prevInput) => ({ ...prevInput, [name]: value }));
    };
    const handleSubmit = async(event) => {
      event.preventDefault();
      setError(null);
     try {
      console.log("indise try");
       if( !input.title || !input.description || !input.dueDate){
         setError("Please Enter all field correctly");
         return;
        }
      console.log("response");

      const response = await axios.post(`${API_URL}/tasks`,input,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`

        }
      });
      console.log("response2",response);
      

      fetchTask();
      

  
      
     } catch (error) {
      if(error.response){
        setError(error.response?.data?.message || "failed to add task. please try again"); 
      }else{
        setError("An unexpected error occured while adding task");
      }
     }
  
    };

    const handleDeleteTask = async(id) =>{
        if(window.confirm('Are you sure you want to delete this task?')){
            try {
                await axios.delete(`${API_URL}/tasks/${id}`,
                    {headers:{
                        Authorization:`Bearer ${token}`
                    }}
                );
                setError("Task deleted successfully!");
                fetchTask();
            } catch (error) {
                if(error.response){
                    console.log("error in delete task  ",error);
                    setError(error.response?.data?.message || "failed to delete task. please try again"); 
                  }else{
                    setError("An unexpected error occured while deleting task");
                  }
            }
        }
    }

    const toggleTaskStatus = async(id)=>{
        const task = tasks.find(task => task._id === id);

        const updatedTask = {...task,status:task.status ==='completed' ? 'incomplete':"completed"};

        try {
            await axios.patch(`${API_URL}/tasks/${id}`,updatedTask,{headers:{
                Authorization:`Bearer ${token}`
            }});
            fetchTask();
        } catch (error) {
            if(error.response){
                console.log("error in updating task  ",error);
                setError(error.response?.data?.message || "failed to update task. please try again"); 
              }else{
                setError("An unexpected error occured while updating task");
              }
        }
    }

    const formatDueDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };



  return (
<>
<form action="" onSubmit={handleSubmit} className="register-form">
    <h1>Task Manager</h1>
        <div className="form-group">
          <label>Title: </label>
          <input
            type="string"
            name="title"
            value={input.title}
            placeholder="Add title"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="string"
            name="description"
            value={input.description}
            placeholder="Add description"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <input
            type="date"
            name="dueDate"
            value={input.dueDate}
            placeholder="Add dueDate"
            onChange={handleChange}
          />
        </div>
        {error && <div className="error-message">{error}</div> }

        <button className="submit-button" type="submit" >Add Task</button>
      </form>

<ul className='task-list'>
    {tasks.map((task)=>(
        <li key={task._id} className={task.status} >
            <span onClick={()=> toggleTaskStatus(task._id)} style={{cursor:'pointer'}}>
                {task.title} - {task.status}
                {/* {task} */}
            </span>
            <div>Due Date: {formatDueDate(task.dueDate)}</div>
            <div>{task.description}</div>

            <button onClick={()=>handleDeleteTask(task._id)} >Delete</button>
        </li>
    ))}
</ul>

</>  )
}

export default TaskManager

//ended