import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSignout = () => {
    dispatch(signout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                <span className="ms-2">TaskerAide</span>
              </Link>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  {user ? (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link btn btn-link"
                          onClick={handleSignout}
                        >
                          Sign Out
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/signin">
                          Sign In
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/signup">
                          Sign Up
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
