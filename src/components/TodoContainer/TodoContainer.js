import { useState, useEffect } from 'react';
import axios from '../../axiosUrl'
import './TodoContainer.css';
import ToDoTask from '../ToDoTask/ToDoTask';

import { useSelector, useDispatch } from 'react-redux';
import { loadTasks, updateTasks } from '../../reducer/reducer';

const TodoContainer = (props) => {
  const tasks = useSelector((state) => {return state.tasks})
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks())
    console.log();
  })

  const moveRight = (taskId) => {
    const taskIndex = tasks.findIndex((v)=>v._id === taskId);
    const task = {...tasks[taskIndex]};
    task.completed= true;

    axios.put("/task", {...task})
    .then(res => {
      dispatch(updateTasks({completed: true, _id:task._id}))
    })
    .catch(err => {
      console.log(err);
    })
  }
  const moveLeft = (taskId) => {
    const taskIndex = tasks.findIndex((v)=>v._id === taskId);
    const task = {...tasks[taskIndex]};
    task.completed= false;

    axios.put("/task", {...task})
    .then(res => {
      dispatch(updateTasks({completed: false, _id:task._id}))
    })
    .catch(err => {
      console.log(err);
    })
  }
  const deleteTask = (taskId) => {
    axios.delete("/task/"+taskId)
    .then(res => {
      dispatch(loadTasks());
    })
    .catch(err => {
      console.log(err);
    })
  }

  let openTaskMap = null;
  let completedTaskMap = null;

  if(tasks.length > 0) {
    openTaskMap = tasks.map((v, i) => {
      if (!v.completed) {
        return (
          <ToDoTask key={v._id} task={v.task} priority={v.priority.name} 
            id={v._id}
            completed={v.completed}
            moveRight={moveRight}
            moveLeft={moveLeft}
            delete={deleteTask}
          />
        )
      }
      return null;
    });

    completedTaskMap = tasks.map((v, i) => {
      if (v.completed) {
        return (
          <ToDoTask key={v._id} task={v.task} priority={v.priority.name}
            id={v._id} 
            completed={v.completed}
            moveRight={moveRight}
            moveLeft={moveLeft}
            delete={deleteTask}
          />
        )
      }
      return null;
    })
  }

  return (
    <div className="ToDoContainer">
      <div className='ToDoContainer__Column'>
        <div className="ToDoContainer__Column__Title">
          ToDo
        </div>
        <div className='ToDoContainer__Column__Content'>
          {openTaskMap}
        </div>
      </div>
      <div className="ToDoContainer__Column">
        <div className="ToDoContainer__Column__Title">
          Completed
        </div>
        <div className="ToDoContainer__Column__Content">
          {completedTaskMap}
        </div>
      </div>
    </div>
  )
}
export default TodoContainer;