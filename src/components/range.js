import React, { useState } from 'react';
import MousePosition from '../utils/mousePosition';

const namespace = 'range-slider';

const Range = ({ min, max }) => {
  const minRangeTrack = min;
  const maxRangeTrack = max * 3;

  const [rangeValues, setRangeValues] = useState({
    minValue: min,
    maxValue: max,
    translateMinRange: minRangeTrack,
    translateMaxRange: maxRangeTrack,
  });

  const [isRangeMoving, setIsRangeMoving] = useState({
    minRange: false,
    maxRange: false,
  });

  const validationtranslate = (translateRange, rangeType, limitRange, e) => {
    switch (translateRange) {
      case minRangeTrack:
        return translateRange + e.movementX;
      case maxRangeTrack:
        return translateRange - e.movementX;
      case limitRange:
        if (rangeType === 'range-min') {
          return translateRange - e.movementX - 10;
        } else if (rangeType === 'range-max') {
          return translateRange + e.movementX + 10;
        }
      default:
        if (translateRange <= minRangeTrack) {
          return minRangeTrack + e.movementX;
        } else if (translateRange >= maxRangeTrack) {
          return maxRangeTrack + e.movementX;
        } else {
          return translateRange + e.movementX;
        }
    }
  };

  const handleRangeMinMove = (e, isMoving) => {
    const limitRange =
      rangeValues.translateMaxRange - e.target.getBoundingClientRect().width;

    if (isMoving) {
      setIsRangeMoving({
        ...isRangeMoving,
        minRange: true,
      });
    } else {
      setIsRangeMoving({
        ...isRangeMoving,
        minRange: false,
      });
    }

    setRangeValues({
      ...rangeValues,
      minValue:
        rangeValues.translateMinRange === min
          ? min
          : Math.floor(rangeValues.translateMinRange / 3),
      translateMinRange: validationtranslate(
        rangeValues.translateMinRange,
        'range-min',
        limitRange,
        e
      ),
      rangeMinIsActive: true,
    });
  };

  const handleRangeMaxMove = (e, isMoving) => {
    const limitRange =
      rangeValues.translateMinRange + e.target.getBoundingClientRect().width;

    if (isMoving) {
      setIsRangeMoving({
        ...isRangeMoving,
        maxRange: true,
      });
    } else {
      setIsRangeMoving({
        ...isRangeMoving,
        maxRange: false,
      });
    }

    setRangeValues({
      ...rangeValues,
      maxValue:
        rangeValues.translateMaxRange === max
          ? max
          : Math.floor(rangeValues.translateMaxRange / 3),
      translateMaxRange: validationtranslate(
        rangeValues.translateMaxRange,
        'range-max',
        limitRange,
        e
      ),
    });
  };

  const handleChangeMinValue = (min, max) => (e) => {
    const newValue =
      e.target.value > max ||
      e.target.value < 0 ||
      e.target.value >= rangeValues.maxValue
        ? min
        : e.target.value;

    setRangeValues({
      ...rangeValues,
      minValue: newValue,
      translateMinRange: newValue * 3,
    });
  };

  const handleChangeMaxValue = (min, max) => (e) => {
    const newValue =
      e.target.value > max ||
      e.target.value < 0 ||
      e.target.value <= rangeValues.minValue
        ? max
        : e.target.value;

    setRangeValues({
      ...rangeValues,
      maxValue: newValue,
      translateMaxRange: newValue * 3,
    });
  };

  return (
    <div className={`${namespace}-container`}>
      <label
        className={`${namespace}-label range-slider-label--left`}
        htmlFor="rangeValueMin"
      >
        <input
          className={`${namespace}-input`}
          value={rangeValues.minValue}
          type="number"
          onChange={handleChangeMinValue(min, max)}
          id="rangeValueMin"
        />
        €
      </label>
      <div className={namespace}>
        <MousePosition onMovePosition={handleRangeMinMove}>
          <div
            className={`${namespace}__handle ${namespace}__handle--min ${
              isRangeMoving.minRange ? `${namespace}__handle--is-active` : ''
            }`}
            style={{
              transform: `translateX(${rangeValues.translateMinRange}px)`,
            }}
          ></div>
        </MousePosition>
        <div className={`${namespace}__track`}></div>
        <MousePosition onMovePosition={handleRangeMaxMove}>
          <div
            className={`${namespace}__handle ${namespace}__handle--max ${
              isRangeMoving.maxRange ? `${namespace}__handle--is-active` : ''
            }`}
            style={{
              transform: `translateX(${rangeValues.translateMaxRange}px)`,
            }}
          ></div>
        </MousePosition>
      </div>
      <label
        className={`${namespace}-label range-slider-label--right`}
        htmlFor="rangeValueMax"
      >
        <input
          className={`${namespace}-input`}
          value={rangeValues.maxValue}
          type="number"
          onChange={handleChangeMaxValue(min, max)}
          id="rangeValueMax"
        />
        €
      </label>
    </div>
  );
};

export default Range;
