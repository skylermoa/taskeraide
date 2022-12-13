import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../features/tasks/taskSlice";

function TaskForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createTask({ text }));
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="text" className="form-label">
          Enter a task:
        </label>
        <input
          type="text"
          className="form-control"
          id="text"
          name="text"
          value={text}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary mb-3">
        Add
      </button>
    </form>
  );
}

export default TaskForm;
