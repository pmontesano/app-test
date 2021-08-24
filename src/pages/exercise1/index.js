import React from 'react';
import Range from '../../components/range';
import '../../styles/main.css';

const Exercise1 = (initialState) => {
  const { min, max } = initialState;

  console.log('min', min, 'max', max);

  return (
    <div>
      <h1>Normal Range</h1>
      <Range min={min} max={max} />
    </div>
  );
};

export default Exercise1;
