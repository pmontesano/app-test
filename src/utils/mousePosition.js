import React, { useState } from 'react';

export default function MousePosition(props) {
  const {
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onMouseMove,
    onMovePosition,
    children,
    style,
    className,
  } = props;

  const [isMoving, setIsMoving] = useState(false);

  const handleMouseDown = (e) => {
    setIsMoving(true);
    e.target.addEventListener('mousedown', onMouseDown);
  };

  const handleMouseUp = (e) => {
    setIsMoving(false);
    onMovePosition(e, false);
    e.target.removeEventListener('mouseup', onMouseUp);
  };

  const handleMouseLeave = (e) => {
    setIsMoving(false);
    onMovePosition(e, false);
    e.target.removeEventListener('mouseleave', onMouseLeave);
  };

  const handleMouseMove = (e) => {
    if (isMoving) onMovePosition(e, isMoving);
    onMouseMove(e);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={style}
      className={className}
    >
      {children}
    </div>
  );
}

MousePosition.defaultProps = {
  onMouseDown: () => {},
  onMouseUp: () => {},
  onMouseMove: () => {},
};
