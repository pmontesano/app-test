import React, { useCallback, useState, useEffect, useRef } from 'react';
import MousePosition from '../utils/mousePosition';

const namespace = 'range-slider';

const RangeFixed = ({ min, max, values, onChange }) => {
  const minRangeTrack = 1;
  const maxRangeTrack = 300;
  const minVars = 1;
  const maxVars = 100;
  const varsDiff = maxRangeTrack / maxVars;
  const minValueRef = useRef(min);
  const maxValueRef = useRef(max);

  const [rangeValues, setRangeValues] = useState({
    minValue: minVars,
    maxValue: maxVars,
    rangeMinValue: min,
    rangeMaxValue: max,
    translateMinRange: minRangeTrack,
    translateMaxRange: maxRangeTrack,
  });

  const {
    minValue,
    maxValue,
    rangeMinValue,
    rangeMaxValue,
    translateMinRange,
    translateMaxRange,
  } = rangeValues;

  const [valuePercent, setValuePercent] = useState({
    minValuePercent: 1,
    maxValuePercent: 100,
  });

  const { minValuePercent, maxValuePercent } = valuePercent;

  const [isRangeMoving, setIsRangeMoving] = useState({
    minRange: false,
    maxRange: false,
  });

  const getPercentFromStepValue = (step) => {
    const slots = 100 / values.length;
    return Math.floor(step * slots);
  };

  const getValueFromStep = (currentStep) => {
    return values.find((value, index) => {
      if (currentStep === index) {
        return value;
      }
    });
  };

  const getPercent = useCallback(
    (value) => {
      return Math.round(((value - minVars) / (maxVars - minVars)) * 100);
    },
    [minVars, maxVars]
  );

  useEffect(() => {
    const minPercent = getPercent(minValuePercent);
    if (minValueRef.current) {
      if (minValueRef.current.value <= minVars) {
        minValueRef.current.value = minVars;
        setRangeValues({
          ...rangeValues,
          minValue: minValueRef.current.value,
        });
        minValueRef.current.style.left = `${minVars - 1}%`;
      } else {
        minValueRef.current.style.left = `${minPercent}%`;
      }
    }
  }, [minValuePercent, getPercent]);

  useEffect(() => {
    const maxPercent = getPercent(maxValuePercent);
    const limitBound = getPercentFromStepValue(5);

    if (maxValueRef.current) {
      if (maxValueRef.current.value >= limitBound) {
        maxValueRef.current.value = limitBound;
        setRangeValues({
          ...rangeValues,
          maxValue: maxValueRef.current.value,
        });
        maxValueRef.current.style.left = `${limitBound}%`;
      } else {
        maxValueRef.current.style.left = `${maxPercent}%`;
      }
    }
  }, [maxValuePercent, getPercent]);

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

  const getPositionValue = (
    translateRange,
    valuePercentType,
    minValuePercentType,
    minValueType,
    value
  ) => {
    const calcRange = (range) => {
      return range - range / 2;
    };

    const setStateValues = (
      step,
      translateRange,
      valuePercentType,
      minValuePercentType,
      minValueType
    ) => {
      const newValue = getPercentFromStepValue(step);

      setValuePercent({
        ...valuePercent,
        [valuePercentType]: newValue,
      });

      setRangeValues({
        ...rangeValues,
        [minValuePercentType]:
          step === 6 ? getValueFromStep(step - 1) : getValueFromStep(step),
        [minValueType]: newValue,
        [translateRange]: newValue * varsDiff,
      });
    };

    const firstStepRange = getPercentFromStepValue(1) / 2;
    const secondStepRange = calcRange(getPercentFromStepValue(3));
    const thirdStepRange = calcRange(getPercentFromStepValue(5));
    const fourthStepRange = calcRange(getPercentFromStepValue(7));
    const fifthStepRange = calcRange(getPercentFromStepValue(9));

    if (value < firstStepRange) {
      setStateValues(
        0,
        translateRange,
        valuePercentType,
        minValuePercentType,
        minValueType
      );
    } else if (value >= firstStepRange && value < secondStepRange) {
      setStateValues(
        1,
        translateRange,
        valuePercentType,
        minValuePercentType,
        minValueType
      );
    } else if (value >= secondStepRange && value < thirdStepRange) {
      setStateValues(
        2,
        translateRange,
        valuePercentType,
        minValuePercentType,
        minValueType
      );
    } else if (value >= thirdStepRange && value < fourthStepRange) {
      setStateValues(
        3,
        translateRange,
        valuePercentType,
        minValuePercentType,
        minValueType
      );
    } else if (value >= fourthStepRange && value < fifthStepRange) {
      setStateValues(
        4,
        translateRange,
        valuePercentType,
        minValuePercentType,
        minValueType
      );
    } else if (value >= fifthStepRange) {
      setStateValues(
        5,
        translateRange,
        valuePercentType,
        minValuePercentType,
        minValueType
      );
    }
  };

  const handleRangeMinMove = (e, isMoving) => {
    if (isMoving) {
      setIsRangeMoving({
        ...isRangeMoving,
        minRange: true,
      });
      setRangeValues({
        ...rangeValues,
        minValue:
          minValue < min ? min : Math.floor(translateMinRange / varsDiff),
        translateMinRange: validationTranslate(
          translateMinRange,
          'range-min',
          e
        ),
      });

      setValuePercent({
        ...valuePercent,
        minValuePercent:
          minValuePercent < minVars
            ? minVars
            : Math.floor(translateMinRange / varsDiff),
      });
    } else {
      getPositionValue(
        'translateMinRange',
        'minValuePercent',
        'rangeMinValue',
        'minValue',
        minValue
      );
      setIsRangeMoving({
        ...isRangeMoving,
        minRange: false,
      });
    }
  };

  const handleRangeMaxMove = (e, isMoving) => {
    if (isMoving) {
      setIsRangeMoving({
        ...isRangeMoving,
        maxRange: true,
      });

      setRangeValues({
        ...rangeValues,
        maxValue: Math.floor(translateMaxRange / varsDiff),
        translateMaxRange: validationTranslate(
          translateMaxRange,
          'range-max',
          e
        ),
      });
      setValuePercent({
        ...valuePercent,
        maxValuePercent: Math.floor(translateMaxRange / varsDiff),
      });
    } else {
      getPositionValue(
        'translateMaxRange',
        'maxValuePercent',
        'rangeMaxValue',
        'maxValue',
        maxValue
      );
      setIsRangeMoving({
        ...isRangeMoving,
        maxRange: false,
      });
    }
  };

  useEffect(() => {
    onChange({ minValue, maxValue });
  }, [minValue, maxValue, onChange]);

  return (
    <div className={`${namespace}-wrapper ${namespace}-fixed`}>
      <div className={`${namespace}-label range-slider-label--left`}>
        {rangeMinValue} €
      </div>
      <div className={namespace}>
        <MousePosition
          onMovePosition={handleRangeMinMove}
          className={`${namespace}__thumb`}
        >
          <button
            ref={minValueRef}
            value={minValue}
            className={`${namespace}__handle ${namespace}__handle--left ${namespace}__handle-fixed--left ${
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
            className={`${namespace}__handle ${namespace}__handle--right  ${namespace}__handle-fixed--right ${
              isRangeMoving.maxRange ? `${namespace}__handle--is-active` : ''
            }`}
            style={{ left: '83%' }}
          ></button>
        </MousePosition>
        <div className={`${namespace}-fixed__track`}>
          <svg
            role="presentation"
            width="100%"
            height="10"
            xmlns="http://www.w3.org/2000/svg"
          >
            {values.map((value, index) => (
              <rect
                value={value}
                key={index}
                className={`${namespace}-fixed__tick`}
                x={`${getPercentFromStepValue(index)}%`}
                y="3"
                width="1"
                height="10"
              ></rect>
            ))}
          </svg>
        </div>
      </div>
      <div className={`${namespace}-label range-slider-label--right`}>
        {rangeMaxValue} €
      </div>
    </div>
  );
};

export default RangeFixed;
