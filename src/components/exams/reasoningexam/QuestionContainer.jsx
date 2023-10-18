import React, { useEffect, useState } from 'react'
const QuestionContainer = ({currentNumber,questions,handleOptionChange,progress}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    },[]);
    return(
        <div className="column">
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
                          questions[currentNumber].id
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
            <div className="bottom-btn-row">
              <button
                className="btn btn-blue"
                onClick={() => {
                  progress("minus");
                }}
              >
                Previous
              </button>
              <button
                className="btn btn-blue"
                onClick={() => {
                  progress("plus");
                }}
              >
                Next
              </button>
              <button className="btn btn-red">Quit</button>
              <button className="btn btn-green">Save</button>
            </div>
          </div>
    )
}

export default QuestionContainer