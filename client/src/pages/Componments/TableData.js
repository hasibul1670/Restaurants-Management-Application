import React from 'react';
import Menu from '../Menu';

const Table = ({ tableNumber }) => {
  return (
    <div>
      <h2>Table {tableNumber}</h2>
      <Menu table_No={tableNumber} /> 
    </div>
  );
};

export default Table;
