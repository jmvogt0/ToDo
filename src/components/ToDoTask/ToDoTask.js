import "./ToDoTask.css";

const ToDoTask = (props) => {
  let moveLeft = null;
  let moveRight = null;

  if(props.completed) {
    moveLeft = (
      <div className="Task__Left" onClick={()=>{props.moveLeft(props.id)}}>
        &#x21D0;
      </div>
    )
  } else {
    moveRight = (
      <div className="Task__Right" onClick={()=>{props.moveRight(props.id)}}>
         &#x21D2;
      </div>
    )
  }

  return (
    <div className="Task" key={props.id}>
      {moveLeft}
      <div className="Task__Content">
        {props.task} | {props.priority}
      </div>
      <div className="Task__Buttons">
        <div>
          &#x270E;
        </div>
        <div onClick={()=>{props.delete(props.id)}}>
          &#x1F5D1;
        </div>
      </div>
      {moveRight}
    </div>
  )
}

export default ToDoTask;