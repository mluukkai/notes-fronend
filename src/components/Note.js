import React from 'react'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'
  return (
    <div className='wrapper'>
      <div>
        {note.content}
      </div>
      <div>
        <button onClick={toggleImportance}>{label}</button>
      </div>
    </div>
  )
}

export default Note