import React, { useEffect, useState } from 'react';
import DragMove from '../utils/dragMove';

const Range = ({ min, max }) => {
  const [translateMinRange, setTranslateMinRange] = useState({
    x: min,
  });

  const [translateMaxRange, setTranslateMaxRange] = useState({
    x: 300,
  });

  // const min = target.min;
  // const max = target.max;
  // const val = target.value;

  // target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';

  const rangeValueMin = translateMinRange.x;
  const rangeValueMax = translateMaxRange.x;

  const handleDragMoveLeft = (e) => {
    console.log('handleDragMoveLeft -->', translateMinRange.x);

    setTranslateMinRange({
      x:
        translateMinRange.x >= min && translateMinRange.x <= rangeValueMax - 28
          ? translateMinRange.x + e.movementX
          : translateMinRange.x - e.movementX,
    });
  };

  const handleDragMoveRight = (e) => {
    console.log('handleDragMoveRight -->', translateMaxRange.x);

    setTranslateMaxRange({
      x:
        translateMaxRange.x <= 300 && translateMaxRange.x >= rangeValueMin + 28
          ? translateMaxRange.x + e.movementX * 3
          : translateMaxRange.x - e.movementX,
    });
  };

  return (
    <div className="range-slider-container">
      min: {rangeValueMin}
      <div className="range-slider">
        <DragMove onDragMove={handleDragMoveLeft}>
          <div
            className="range-slider__handle range-slider__handle--min"
            style={{
              transform: `translateX(${translateMinRange.x}px)`,
            }}
          ></div>
        </DragMove>

        <DragMove onDragMove={handleDragMoveRight}>
          <div
            className="range-slider__handle range-slider__handle--max"
            style={{
              transform: `translateX(${translateMaxRange.x}px)`,
            }}
          ></div>
        </DragMove>
        <div className="range-slider__track"></div>
      </div>
      max: {rangeValueMax}
    </div>
  );
};

Range.defaultProps = {};

export default Range;
