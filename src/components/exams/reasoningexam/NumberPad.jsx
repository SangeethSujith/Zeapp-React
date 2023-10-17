import React from 'react'

const NumberPad = ({ number, questionID ,setcurrentNumber,setcurrentQuestionID}) => {
  const handleClick = (num,qid) => {
    setcurrentNumber(num-1)
    setcurrentQuestionID(qid)
  }
  return (
    <button className="button" onClick={()=>{handleClick(number,questionID)}}>{number}</button>
  )
}

export default NumberPad