import React from 'react'

const NumberPad = ({ number, questionID,setcurrentNumber,isAnswered}) => {
  const handleClick = (num,qid) => {
    setcurrentNumber(num)
  }
  const checkQid = ({ data,qid }) => {
    const isQidPresent = data.some(item => item.qid === questions[currentNumber].id);
    console.log('isQidPresent', isQidPresent, data, qid)
    return isQidPresent
  }
  console.log('isAnswered', isAnswered)
  return (
    <button className={`button ${isAnswered&&"btn-answered"}`} onClick={()=>{handleClick(number,questionID)}}>{number+1}</button>
  )
}

export default NumberPad