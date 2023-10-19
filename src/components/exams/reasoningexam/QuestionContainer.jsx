import React, { useEffect, useState } from 'react'
const QuestionContainer = ({ currentNumber, questions, handleOptionChange }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    const startTimer = () => {
      interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    };

    startTimer();

    return () => {
      clearInterval(interval); // Clear the interval on component cleanup
      setElapsedTime(0); // Reset the elapsed time
    };
  }, [currentNumber]); 
  // console.log('elapsedTime', elapsedTime)
  return (
    <>
      <div className="questions-container">
        <div className="container-head">
          Question {currentNumber + 1} :
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: questions[currentNumber].question,
          }}
        ></div>
      </div>
      <div className="options-container">
        <div className="options-head">Options :</div>
        <div
          className="options-list"
        >
          {questions[currentNumber].options.map((option) => (
            <label key={option.oid}>
              <input
                type="radio"
                className="radio-button"
                name={questions[currentNumber].id}
                value={option.q_option}
                onChange={() => {
                  handleOptionChange(
                    option.oid,
                    questions[currentNumber].id,
                   elapsedTime
                  );
                }}
              />
              <span
                htmlFor={questions[currentNumber].id}
                dangerouslySetInnerHTML={{ __html: option.q_option }}
              />
            </label>
          ))}
        </div>
      </div>
      </>
  )
}

export default QuestionContainer