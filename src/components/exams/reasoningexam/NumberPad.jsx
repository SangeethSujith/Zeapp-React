import React from 'react'

const NumberPad = ({ number, questionID,setcurrentNumber,setcurrentQuestionID}) => {
  const handleClick = (num,qid) => {
    setcurrentNumber(num)
    setcurrentQuestionID(qid)
  }

  return (
    <button className="button" onClick={()=>{handleClick(number,questionID)}}>{number+1}</button>
  )
}

export default NumberPad