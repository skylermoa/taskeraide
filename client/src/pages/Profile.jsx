import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, reset } from "../features/tasks/taskSlice";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, rejected, message } = useSelector((state) => state.task);

  useEffect(() => {
    if (rejected) {
      alert(message); // show the error message
    }
    if (!user) {
      navigate("/"); // redirect to the home page
    }
    dispatch(getTasks());
    dispatch(reset()); // reset the state of the task slice
  }, [user, navigate, rejected, message, dispatch]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-5">Hello {user.username}</h1>
          <TaskForm />
          <ul className="list-group">
            {/* show all the tasks of the user */}
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
