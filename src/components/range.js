import React, { useCallback, useState, useEffect, useRef } from 'react';
import MousePosition from '../utils/mousePosition';

const namespace = 'range-slider';

const Range = ({ min, max, onChange }) => {
  const minRangeTrack = 1;
  const maxRangeTrack = 300;
  const varsDiff = maxRangeTrack / max;
  const minValueRef = useRef(min);
  const maxValueRef = useRef(max);
  const range = useRef(null);

  const [rangeValues, setRangeValues] = useState({
    minValue: min,
    maxValue: max,
    translateMinRange: minRangeTrack,
    translateMaxRange: maxRangeTrack,
  });

  const [inputValue, setInputValue] = useState({
    inputMinValue: min,
    inputMaxValue: max,
    isTyping: false,
    typingTimeout: 0,
  });

  const [isRangeMoving, setIsRangeMoving] = useState({
    minRange: false,
    maxRange: false,
  });

  const { minValue, maxValue, translateMinRange, translateMaxRange } =
    rangeValues;

  const { inputMinValue, inputMaxValue, isTyping, typingTimeout } = inputValue;

  const getPercent = useCallback(
    (value) => {
      return Math.round(((value - min) / (max - min)) * 100);
    },
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValueRef.current.value);

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
      range.current.style.width = `${maxPercent - minPercent}%`;
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

  const validationTranslate = (translateRange, rangeType, e) => {
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
      minValue: minValue < min ? min : Math.floor(translateMinRange / varsDiff),
      translateMinRange: validationTranslate(translateMinRange, 'range-min', e),
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
      maxValue: Math.floor(translateMaxRange / varsDiff),
      translateMaxRange: validationTranslate(translateMaxRange, 'range-max', e),
    });
  };

  const handleChangeValue =
    (
      inputValueType,
      otherInputValueType,
      valueType,
      otherValueType,
      translateType
    ) =>
    (e) => {
      const newValue = e.target.value;

      const timeValidation = newValue != '' ? 500 : 2000;

      if (typingTimeout) {
        clearTimeout(typingTimeout);
        setInputValue({
          isTyping: false,
        });
      }

      setInputValue({
        [inputValueType]: newValue,
        [otherInputValueType]: otherValueType,
        isTyping: true,
        typingTimeout: setTimeout(() => {
          validationValue(Math.floor(newValue), valueType, translateType);
        }, timeValidation),
      });
    };

  const validationValue = (newValue, valueType, translateType) => {
    if (
      newValue < min ||
      newValue > max ||
      (valueType === 'minValue' && newValue >= maxValue) ||
      (valueType === 'maxValue' && newValue <= minValue)
    ) {
      setRangeValues({
        ...rangeValues,
      });
      setInputValue({
        ...inputValue,
        isTyping: false,
      });
    } else {
      setRangeValues({
        ...rangeValues,
        [valueType]: newValue,
        [translateType]: newValue * varsDiff,
      });
      setInputValue({
        ...inputValue,
        isTyping: false,
      });
    }
  };

  useEffect(() => {
    onChange({ minValue, maxValue });
  }, [minValue, maxValue, onChange]);

  return (
    <div className={`${namespace}-wrapper`}>
      <label
        className={`${namespace}-label range-slider-label--left`}
        htmlFor="rangeValueMin"
      >
        <input
          className={`${namespace}-input`}
          value={isTyping ? inputMinValue : minValue}
          type="number"
          onChange={handleChangeValue(
            'inputMinValue',
            'inputMaxValue',
            'minValue',
            maxValue,
            'translateMinRange'
          )}
          id="rangeValueMin"
        />
        €
      </label>
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
            style={{ marginLeft: '-10px' }}
          ></button>
        </MousePosition>

        <div ref={range} className={`${namespace}__track`} />
      </div>
      <label
        className={`${namespace}-label range-slider-label--right`}
        htmlFor="rangeValueMax"
      >
        <input
          className={`${namespace}-input`}
          value={isTyping ? inputMaxValue : maxValue}
          type="number"
          onChange={handleChangeValue(
            'inputMaxValue',
            'inputMinValue',
            'maxValue',
            minValue,
            'translateMaxRange'
          )}
          id="rangeValueMax"
        />
        €
      </label>
    </div>
  );
};

export default Range;
