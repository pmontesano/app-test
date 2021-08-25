import React, { useEffect, useState } from 'react';

const Range = ({ min, max }) => {
  const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
      window.addEventListener('mousemove', setFromEvent);
      return () => {
        window.removeEventListener('mousemove', setFromEvent);
      };
    }, []);

    return position;
  };

  const position = useMousePosition();

  return (
    <div>
      {position.x}
      <div className=""></div>
    </div>
  );
};

Range.defaultProps = {};

export default Range;
