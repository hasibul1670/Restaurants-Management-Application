import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Home = () => {
  const navigate = useNavigate();

  const tables = [1, 2, 3, 4, 5, 6, 7, 8];

  const navigateToTable = (tableNumber) => {
    navigate(`/table/${tableNumber}`);
  };
  return (
    <>
      <div>
        <div class="welcome-container">
          <img className="logo" src={logo} alt="logo" />
          <h1 id="welcome-heading-id" class="welcome-heading">
            Welcome to Our Restaurent
          </h1>
          <p class="welcome-subheading">Explore the world of delicious food</p>
        </div>
      </div>

      <div className="table-row">
        {tables.map((tableNumber) => (
          <button
            key={`table-button-${tableNumber}`}
            className="table_button"
            onClick={() => navigateToTable(tableNumber)}
          >
            Table No: {tableNumber}
          </button>
        ))}

      </div>
      <Link to="/dashboard">
          {" "}
          <button className="btn btn-info">Dashboard</button>
        </Link>
    </>
  );
};

export default Home;
