import React from 'react'
import noteService from './services/notes'

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

const Notification = ({ message }) => {
  if ( message===null ) {
    return null
  } 
  return (
    <div className='error'>
      {message}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      notes: [],
      new_note: '',
      showAll: true,
      error: null
    }
  }

  componentWillMount() {
    noteService.getAll().then(notes =>
      this.setState({ notes })
    )
  }

  addNote = (e) => {
    e.preventDefault()  
    const noteObject = {
      content: this.state.new_note,
      date: new Date(),
      important: Math.random()>0.5,
    }

    noteService.create(noteObject).then(newNote => {
      this.setState({
        notes: this.state.notes.concat(newNote),
        new_note: ''
      })
    })
  }

  toggleImportanceOf = (id) => {
    return () => {
      const note = this.state.notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }

      noteService
        .update(id, changedNote)
        .then(changedNoteFromServer => {

          const remainingNotes = this.state.notes.filter(n => {
            return n.id !== changedNoteFromServer.id
          })

          console.log(remainingNotes.length)

          this.setState({
            notes: remainingNotes.concat(changedNoteFromServer),
          })
        })
        .catch(error => {
          this.setState({ 
            error: `muistiinpano '${note.content}' on jo valitettavasti poistettu palvelimelta`,
            notes: this.state.notes.filter(n => n.id !== id) 
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 5000)
        })
    }
  }

  handleNoteChange = (e) => {
    this.setState({ new_note: e.target.value })
  }

  toggleVisible = () => {
    this.setState({showAll: !this.state.showAll})
  }

  render() {
    const notesToShow = this.state.showAll ? 
                          this.state.notes : 
                          this.state.notes.filter(note=>note.important === true ) 

    const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

    const byId = (note1, note2) => note1.id<note2.id ? -1 : 1
    
    return(
      <div>
        <h1>Muistiinpanot</h1>

        <Notification message={this.state.error}/>

        <div>
          <button onClick={this.toggleVisible}>
            näytä {label}
          </button>
        </div>

        <div className='notes'>
          {notesToShow.sort(byId).map(note => <Note
            key={note.id}
            note={note}
            toggleImportance={this.toggleImportanceOf(note.id)}
          />)}
        </div>

        <form onSubmit={this.addNote}>
          <input 
            value={this.state.new_note} 
            onChange={this.handleNoteChange}
          />
          <button>tallenna</button>
        </form>

      </div >
    ) 
  }
}

export default App