import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, signup } from "../features/auth/authSlice";

function Signup() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = userData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, fulfilled, rejected, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (rejected) {
      alert(message);
    }
    if (fulfilled || user) {
      navigate("/profile");
    }
    dispatch(reset());
  }, [user, fulfilled, rejected, message, navigate, dispatch]);

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      username,
      password,
    };
    dispatch(signup(userData));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-5">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
