import { useState, useEffect } from "react";
import axios from "../../axiosUrl"
import './AddTask.css';

const AddTask = (props) => {
  const [title, setTitle] = useState("");
  const[priority, setPriority] = useState("medium"); 
  const [allPriorities, setAllPriorities] = useState([]);
  const [newPriority, setNewPriority] = useState("");

  useEffect(()=>{
    getAllPriorities();
  },[]);

  const getAllPriorities = () => {
    axios.get("/priorities")
    .then((res) => {
      setAllPriorities(res.data)
      setPriority(res.data[0]._id)
    }).catch((err) => {
      console.log(err);
    })
  }

  const onNewPriorityChange = (e) => {
    setNewPriority(e.target.value);
  }
  
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const onPriorityChange = (e) => {
    setPriority(e.target.value);
  }

  const onSave=()=> {
    let taskObj = {
      task: title,
      priority,
      completed: false,
    }

    axios.post("/task", taskObj)
    .then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  const onSavePriority = () => {
    axios.post("/priority", {name:newPriority})
    .then(res =>{
      getAllPriorities()
    })
    .catch( err => {
      console.log(err);
    })
  }

  const htmlPriorities = allPriorities.map((v, i) => {
    return (
      <option key={v._id} value={v._id}>{v.name}</option>
    )
  })

  return (
    <div className="AddTask">
      <div className="AddTask__Wrapper">
        <div className="AddTask__Title">
          <h3>Add Task</h3>
        </div>
        <div className="AddTask__Inputs">
          <div>
            <label>Title</label>
            <input type="text" value={title} onChange={onTitleChange}></input>
          </div>
          <div>
            <label>Priority</label>
            <select onChange={onPriorityChange} value={priority}>
              {htmlPriorities}
            </select>
          </div>
        </div>
        <div className="AddTask__Buttons">
          <button className="AddTask__Button" onClick={onSave}>Save</button>
        </div>
      </div>
      <div className="AddTask__Wrapper">
        <div className="AddTask__Title">
          <h3>Add Priority</h3>
        </div>
        <div className="AddTask__Inputs">
          <div>
            <label>Priority</label>
            <input type="text" value={newPriority}
              onChange={onNewPriorityChange}/>
          </div>
          <div className="AddTask__Buttons">
            <button className="AddTask__Button" onClick={onSavePriority}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTask;