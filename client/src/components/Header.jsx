import React,{useEffect,useState} from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { setUserFromToken } from '../slices/authSlice';
import { logout } from "../slices/authSlice";

function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setUserFromToken(token));
    }
    setLoading(false);
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token'); // Optionally clear the token from localStorage
  };


  return (
    <>
      <header className="navbar bg-base-100 mb-6 justify-around flex-1 shadow-md border border-b-2 sm:flex hidden">
        <div className="flex-none">
          <NavLink to="/" className="text-3xl m-2 pacifico-regular">
            MyShop
          </NavLink>
        </div>
        <label className="input input-bordered flex items-center gap-2 w-[480px] font-medium">
          <input
            type="text"
            className="grow"
            placeholder="Search for Products, Brands and More"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div className="flex-none mx-8">
          <NavLink to="/mycart" className="dropdown dropdown-end m-2 px-8">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{useSelector((state)=>state.cart.quantity) || 0}</span>
              </div>
            </div>
          </NavLink>
          <div>
            {loading ?(
              <div className="text-xl">Loading...</div>
            ) :isLoggedIn ? (
              <div className="flex">
                <div className="text-xl text-center mt-[10px] px-2 font-mono">
                  Hi, {user.username}
                </div>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Profile"
                        src="https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-md dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <Link to="/profile" className="justify-between">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <a onClick={handleLogout}>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="navbar-end">
                <NavLink to="/login" className="btn btn-outline text-xl">
                  Login
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </header>

                                    {/* Mobile version */}
      <header className="navbar bg-base-100 sm:hidden">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Search For Products</a>
              </li>
              <li>
                <a>Cart</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <NavLink to="/" className="text-2xl pacifico-regular">
            MyShop
          </NavLink>
        </div>
        <div className="navbar-end">
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src="https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="navbar-end">
              <NavLink to="/login" className="btn btn-outline text-xl">
                Login
              </NavLink>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
