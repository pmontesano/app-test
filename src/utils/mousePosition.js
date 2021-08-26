import React, { useState, useEffect } from 'react';

export default function DragMove(props) {
  console.log('props mouse', props);

  const { onMouseDown, onMouseUp, onMouseMove, children, style, className } =
    props;

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);

    onMouseDown(e);
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);

    onMouseUp(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) onDragMove(e);

    onMouseMove(e);
  };

  useEffect(() => {
    window.addEventListener('Mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('Mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={style}
      className={className}
    >
      {children}
    </div>
  );
}

DragMove.defaultProps = {
  onMouseDown: () => {},
  onMouseUp: () => {},
  onMouseMove: () => {},
};
