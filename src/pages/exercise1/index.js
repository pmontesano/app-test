import React from 'react';
import Range from '../../components/range';

const Exercise1 = ({ initialState }) => {
  const { min, max } = initialState.data;

  return (
    <div>
      <h1>Normal Range</h1>
      {min}-{max}
      <Range min={min} max={max} />
    </div>
  );
};

export default Exercise1;
