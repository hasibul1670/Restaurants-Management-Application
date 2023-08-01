/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { userDataContext } from "../../App";
import { AuthContext } from "../../Providers/AuthProvider";

import { useGetcartQuery } from "../../redux/features/cart/cartApi";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import CartSlider from "./CartSlider";

const NavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { course, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    document.body.classList.toggle("drawer-open");
  };

  const handleCartSliderClose = () => {
    setIsDrawerOpen(false);
    document.body.classList.remove("drawer-open");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const { user, logOut } = useContext(AuthContext);
  const [loggInUser] = useContext(userDataContext);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "cupcake"
  );
  const [isDarkMode, setDarkMode] = useState(false);

  const name2 = loggInUser?.name?.firstName;

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };
  useEffect(() => {
    if (isDarkMode) {
      setTheme("dark");
    } else {
      setTheme("cupcake");
    }
  }, [isDarkMode]);

  const navOptions = (
    <>
      <li className="nav-link nav-link-ltr ">
        <Link to="/" className="hover:text-white hover:bg-transparent">
          Home
        </Link>
      </li>
      <li className="nav-link nav-link-ltr">
        <Link to="/courses" className="hover:text-white hover:bg-transparent">
          Our Courses
        </Link>
      </li>
      <li className="nav-link nav-link-ltr">
        <Link
          to="/instructors"
          className="hover:text-white hover:bg-transparent"
        >
          Our Instructors
        </Link>
      </li>

      <li className="nav-link nav-link-ltr">
        {user?.email && (
          <Link
            to="/dashboard"
            className="hover:text-white hover:bg-transparent"
          >
            Dashboard
          </Link>
        )}
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut();
  };

  const email = localStorage.getItem("email");
  const { data } = useGetcartQuery(email, {
    refetchOnMountOrArgChange: true,
  });

  const cartData = data?.data;

  return (
    <div className="navbar fixed z-20  max-w-screen-2xl bg-gray-600	 ">
      <div className="navbar-start">
        <div className="dropdown ">
          {!isDropdownOpen ? (
            <label
              tabIndex={0}
              onClick={toggleDropdown}
              className="btn btn-ghost   lg:hidden"
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          ) : (
            <label
              tabIndex={0}
              onClick={toggleDropdown}
              className="btn btn-ghost  lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/1990/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
          )}

          {isDropdownOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact bg-black  dropdown-content mt-3 p-2 text-primary font-bold shadow  rounded-box w-52 z-50"
            >
              {navOptions}
            </ul>
          )}
        </div>

        <Link to="/" className="btn btn-ghost normal-case text-white text-xl">
          Sunlight{" "}
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu font-bold menu-horizontal px-1 ">{navOptions}</ul>
      </div>
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={toggleDarkMode}
        className="w-5 h-7
          md:w-7
          md:h-7
          lg:w-7
        lg:h-7"
      />

      <div className="navbar-end">
        {user?.email ? (
          <>
            <div className="drawer navbar-end drawer-end mr-5">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
                checked={isDrawerOpen}
                onChange={handleDrawerToggle}
              />
              <div className="drawer-content">
                <label htmlFor="my-drawer-4">
                  <div className="badge badge-outline badge-primary">
                    <span>
                      <FaShoppingCart></FaShoppingCart>
                    </span>
                    <span>{cartData?.length || 0}</span>
                  </div>
                </label>
              </div>

              <div className="drawer-side ">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                <div className="menu bg-base-300 p-4 w-72 h-full  text-base-content">
                  <ul className="cart-slider-list">
                    <CartSlider onClose={handleCartSliderClose} />
                  </ul>
                </div>
              </div>
            </div>

            <Link to="/" className=" font-bold text-sm text-white  mr-2 ">
              {name2 || "null"}
            </Link>

            <button onClick={handleLogOut} className="btn btn-sm btn-outline ">
              <span className="text-white text-xs">logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              {" "}
              <button className="btn btn-sm btn-primary">Sign In</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
