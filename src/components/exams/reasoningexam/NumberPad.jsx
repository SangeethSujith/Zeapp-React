import React from 'react'

const NumberPad = ({number, id}) => {
  return (
    <button className="button">{number}</button>
  )
}

export default NumberPad