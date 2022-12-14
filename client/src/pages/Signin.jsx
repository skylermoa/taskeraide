import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, reset } from "../features/auth/authSlice";

function Signin() {
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
      alert(message); // show the error message
    }
    if (fulfilled || user) {
      navigate("/profile"); // redirect to the profile page
    }
    dispatch(reset()); // reset the state of the auth slice
  }, [user, fulfilled, rejected, message, navigate, dispatch]);

  // handle the change of the input fields
  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  // handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      username,
      password,
    };
    dispatch(signin(userData)); // dispatch the signin method
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-5">Sign In</h1>
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

export default Signin;
