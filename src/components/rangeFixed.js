import React, { useCallback, useState, useEffect, useRef } from 'react';
import MousePosition from '../utils/mousePosition';

const namespace = 'range-slider';

const RangeFixed = ({ min, max, values, onChange }) => {
  const minRangeTrack = 1;
  const maxRangeTrack = 300;
  const minValueRef = useRef(min);
  const maxValueRef = useRef(max);
  const range = useRef(null);

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

  const { minValue, maxValue, translateMinRange, translateMaxRange } =
    rangeValues;

  const getPercent = useCallback(
    (value) => {
      // [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]

      const slots = 100 / values.length;

      return Math.round(((value - min) / (max - min)) * 100);
    },
    [min, max]
  );

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getValueFromPosition(position, minValue, maxValue, clientRect) {
    const sizePerc = getPercentageFromPosition(position, clientRect);
    const valueDiff = maxValue - minValue;

    return minValue + valueDiff * sizePerc;
  }

  useEffect(() => {
    const minPercent = clamp(minValue, min, max);
    const maxPercent = getPercent(maxValueRef.current.value);

    console.log('pablito campl', clamp(minValue, min, max));

    if (minValueRef.current) {
      if (minValueRef.current.value <= min) {
        minValueRef.current.value = min;
        setRangeValues({
          ...rangeValues,
          minValue: minValueRef.current.value,
        });
        minValueRef.current.style.left = `${min - 1}%`;
      } else {
        minValueRef.current.style.left = `${minPercent}%`;
      }
    }

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValue, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValueRef.current.value);
    const maxPercent = getPercent(maxValue);

    if (maxValueRef.current) {
      if (maxValueRef.current.value >= max) {
        maxValueRef.current.value = max;
        setRangeValues({
          ...rangeValues,
          maxValue: maxValueRef.current.value,
        });
        maxValueRef.current.style.left = `${max}%`;
      } else {
        maxValueRef.current.style.left = `${maxPercent}%`;
      }
    }

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent + 1}%`;
    }
  }, [maxValue, getPercent]);

  useEffect(() => {
    if (translateMinRange < minRangeTrack) {
      setRangeValues({
        ...rangeValues,
        translateMinRange: minRangeTrack,
      });
    }

    if (translateMaxRange > maxRangeTrack) {
      setRangeValues({
        ...rangeValues,
        translateMaxRange: maxRangeTrack,
      });
    }
  }, [translateMinRange, translateMaxRange]);

  const validationtranslate = (translateRange, rangeType, e) => {
    if (rangeType === 'range-min' && minValue >= maxValue) {
      return translateRange - 5;
    } else if (rangeType === 'range-max' && maxValue <= minValue) {
      return translateRange + 5;
    } else {
      return translateRange + e.movementX;
    }
  };

  const handleRangeMinMove = (e, isMoving) => {
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
      minValue: minValue < min ? min : Math.floor(translateMinRange / 3),
      translateMinRange: validationtranslate(translateMinRange, 'range-min', e),
    });
  };

  const handleRangeMaxMove = (e, isMoving) => {
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
      maxValue: Math.floor(translateMaxRange / 3),
      translateMaxRange: validationtranslate(translateMaxRange, 'range-max', e),
    });
  };

  useEffect(() => {
    onChange({ minValue, maxValue });
  }, [minValue, maxValue, onChange]);

  return (
    <div className={`${namespace}-wrapper`}>
      <div className={`${namespace}-label range-slider-label--left`}>
        {minValue} €
      </div>
      <div className={namespace}>
        <MousePosition
          onMovePosition={handleRangeMinMove}
          className={`${namespace}__thumb`}
        >
          <button
            ref={minValueRef}
            value={minValue}
            className={`${namespace}__handle ${namespace}__handle--left ${
              isRangeMoving.minRange ? `${namespace}__handle--is-active` : ''
            }`}
            style={{ zIndex: minValue > max - 10 && '20' }}
          ></button>
        </MousePosition>
        <MousePosition
          onMovePosition={handleRangeMaxMove}
          className={`${namespace}__thumb`}
        >
          <button
            ref={maxValueRef}
            value={maxValue}
            className={`${namespace}__handle ${namespace}__handle--right ${
              isRangeMoving.maxRange ? `${namespace}__handle--is-active` : ''
            }`}
          ></button>
        </MousePosition>

        <div ref={range} className={`${namespace}__track`} />
      </div>
      <div className={`${namespace}-label range-slider-label--right`}>
        {maxValue} €
      </div>
    </div>
  );
};

export default RangeFixed;
