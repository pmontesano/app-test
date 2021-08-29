import React, { useState } from 'react';

export default function MousePosition(props) {
  const {
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onMouseMove,
    children,
    style,
    className,
  } = props;

  const [isMoving, setIsMoving] = useState(false);

  const handleMouseDown = (e) => {
    const el = e.target;
    setIsMoving(true);
    el.addEventListener('mousedown', onMouseDown);
  };

  const handleMouseUp = (e) => {
    const el = e.target;
    setIsMoving(false);
    el.removeEventListener('mouseup', onMouseUp);
  };

  const handleMouseLeave = (e) => {
    const el = e.target;
    setIsMoving(false);
    el.removeEventListener('mouseleave', onMouseLeave);
  };

  const handleMouseMove = (e) => {
    if (isDragging) onMouseMove(e);
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
