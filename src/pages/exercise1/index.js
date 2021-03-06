import React from 'react';
import Range from '../../components/range';

const Exercise1 = ({ initialState }) => {
  const { min, max } = initialState.data;

  return (
    <div className="container">
      <h1>Normal Range</h1>
      <Range
        min={min}
        max={max}
        onChange={({ min, max }) => {
          min, max;
        }}
      />
    </div>
  );
};

export default Exercise1;
