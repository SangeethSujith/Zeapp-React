import React, { useState, useEffect, useRef } from 'react';
import './timer-style.css';

const ReusableTimer = ({ initialTime, onTimerEnd }) => {
  const FULL_DASH_ARRAY = 283;
  const WARNING_THRESHOLD = 15;
  const ALERT_THRESHOLD = 5;

  const COLOR_CODES = {
    info: {
      color: 'green'
    },
    warning: {
      color: 'orange',
      threshold: WARNING_THRESHOLD
    },
    alert: {
      color: 'red',
      threshold: ALERT_THRESHOLD
    }
  };

  const TIME_LIMIT = initialTime || 20;

  const [timePassed, setTimePassed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [remainingPathColor, setRemainingPathColor] = useState(COLOR_CODES.info.color);

  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimePassed(prev => prev + 1);
      setTimeLeft(TIME_LIMIT - timePassed);
      setRemainingPathColor(calculateRemainingPathColor(timeLeft));

      if (timeLeft === 0) {
        onTimesUp();
      }
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [timePassed, timeLeft, onTimerEnd]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  };

  const calculateRemainingPathColor = (timeLeft) => {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      return alert.color;
    } else if (timeLeft <= warning.threshold) {
      return warning.color;
    } else {
      return info.color;
    }
  };

  const setCircleDasharray = () => {
    const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
    return circleDasharray;
  };

  const calculateTimeFraction = () => {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  };

  const onTimesUp = () => {
    clearInterval(intervalRef.current);
    if (onTimerEnd) {
      onTimerEnd();
    }
  };

  return (
    <div className="base-timer">
      <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className="base-timer__circle">
          <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="base-timer-path-remaining"
            strokeDasharray={setCircleDasharray()}
            className={`base-timer__path-remaining ${remainingPathColor}`}
            d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
          ></path>
        </g>
      </svg>
      <span className="base-timer__label">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default ReusableTimer;
