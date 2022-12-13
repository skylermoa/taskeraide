import { useDispatch } from "react-redux";
import { getTasks, deleteTask } from "../features/tasks/taskSlice";

function TaskItem({ task }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
    dispatch(getTasks());
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {task.text}
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
