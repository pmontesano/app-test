import React, { useState } from 'react';

const Range = ({ min, max }) => {
  const minRangeTrack = min;
  const maxRangeTrack = max * 3;

  const [translateMinRange, setTranslateMinRange] = useState({
    x: minRangeTrack,
  });

  const [translateMaxRange, setTranslateMaxRange] = useState({
    x: maxRangeTrack,
  });

  const [rangeValues, setRangeValues] = useState({
    minValue: min,
    maxValue: max,
  });

  const [isMoving, setIsMoving] = useState(false);

  const handleMouseDown = (e) => {
    const el = e.target;
    setIsMoving(true);
    el.addEventListener('mousedown', handleMouseDown);
  };

  const handleMouseUp = (e) => {
    const el = e.target;
    setIsMoving(false);
    el.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseLeave = (e) => {
    const el = e.target;
    setIsMoving(false);
    el.removeEventListener('mouseleave', handleMouseLeave);
  };

  const handleRangeMinMove = (e) => {
    if (isMoving) handleDragMoveLeft(e);
    setRangeValues({
      ...rangeValues,
      minValue:
        translateMinRange.x === min ? min : Math.floor(translateMinRange.x / 3),
    });
  };

  const handleRangeMaxMove = (e) => {
    if (isMoving) handleDragMoveRight(e);
    setRangeValues({
      ...rangeValues,
      maxValue:
        translateMaxRange.x === max ? max : Math.floor(translateMaxRange.x / 3),
    });
  };

  const handleDragMoveLeft = (e) => {
    const el = e.target;
    const limit = translateMaxRange.x - el.getBoundingClientRect().width;

    if (translateMinRange.x === limit) {
      console.log('es igual al limit');
      setTranslateMinRange({
        x: translateMinRange.x - e.movementX - 5,
      });
    } else if (translateMinRange.x <= minRangeTrack) {
      console.log('es menor a 1');
      setTranslateMinRange({
        x: 1 + e.movementX,
      });
    } else {
      console.log('else de todo lo demas');
      setTranslateMinRange({
        x: translateMinRange.x + e.movementX,
      });
    }

    // setTranslateMinRange({
    //   x:
    //     translateMinRange.x >= minRangeTrack && translateMinRange.x <= limit
    //       ? translateMinRange.x + e.movementX
    //       : 5 + e.movementX,
    // });
  };

  const handleDragMoveRight = (e) => {
    setTranslateMaxRange({
      x: translateMaxRange.x + e.movementX,
    });
  };

  const handleChangeMinValue = (min, max) => (e) => {
    const newValue =
      e.target.value > max || e.target.value < 0 ? min : e.target.value;

    setRangeValues({
      ...rangeValues,
      minValue: newValue,
    });

    setTranslateMinRange({
      x: newValue * 3,
    });
  };

  const handleChangeMaxValue = (min, max) => (e) => {
    const newValue = e.target.value > max ? max : e.target.value;

    setRangeValues({
      ...rangeValues,
      maxValue: newValue,
    });

    setTranslateMaxRange({
      x: newValue * 3,
    });
  };

  return (
    <div className="range-slider-container">
      <span>
        <input
          className="range-slider-input"
          value={rangeValues.minValue}
          type="number"
          onChange={handleChangeMinValue(min, max)}
        />
        €
      </span>
      <div className="range-slider">
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleRangeMinMove}
          onMouseLeave={handleMouseLeave}
          className="range-slider__handle range-slider__handle--min"
          style={{
            transform: `translateX(${translateMinRange.x}px)`,
          }}
        ></div>
        <div className="range-slider__track"></div>
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleRangeMaxMove}
          onMouseLeave={handleMouseLeave}
          className={`range-slider__handle range-slider__handle--max ${
            isMoving ? ' range-slider__handle--is-moving' : ''
          }`}
          style={{
            transform: `translateX(${translateMaxRange.x}px)`,
          }}
        ></div>
      </div>
      <span>
        <input
          className="range-slider-input"
          value={rangeValues.maxValue}
          type="number"
          onChange={handleChangeMaxValue(min, max)}
        />
        €
      </span>
    </div>
  );
};

Range.defaultProps = {};

export default Range;
