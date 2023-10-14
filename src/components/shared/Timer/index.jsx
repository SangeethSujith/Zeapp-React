import React from 'react';
import ReusableTimer from './ReusableTimer'; // Adjust the path as needed

const Timer = () => {
  const handleTimerEnd = () => {
    console.log('Timer ended!');
    // Trigger your desired function here
  };

  return (
    <div className="App">
      <ReusableTimer initialTime={60} onTimerEnd={handleTimerEnd} />
    </div>
  );
};

export default Timer;
