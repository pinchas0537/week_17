import React, { useState } from 'react';

const ToggleComponent = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <button id='button' onClick={toggleClass}>
        {isActive ? 'dark' : 'light'}
      </button>
      
      <div className={isActive ? 'dark' : 'light'}>
      </div>
    </div>
  );
};

export default ToggleComponent;
