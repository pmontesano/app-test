import React from 'react';
import RangeFixed from '../../components/rangeFixed';

const Exercise2 = ({ initialState }) => {
  const { min, max, values } = initialState.data;

  return (
    <div>
      <h1>Fixed values range</h1>
      <RangeFixed
        values={values}
        min={min}
        max={max}
        onChange={({ min, max }) => {
          min, max;
        }}
      />
    </div>
  );
};

export default Exercise2;
