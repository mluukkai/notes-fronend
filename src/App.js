import React from 'react'
import Note from './components/Note'
import noteService from './services/notes'


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
      error: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentWillMount() {
    noteService.getAll().then(notes =>
      this.setState({ notes })
    )
  }

  login = (e) => {
    e.preventDefault()
    console.log('login in with', this.state.username, this.state.password)
  }

  handleNoteChange = (e) => {
    this.setState({ new_note: e.target.value })
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value })
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value })
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

        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div>
            salasana
            <input
              type='password'
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <button>kirjaudu</button>
        </form>

        <h2>Luo uusi muistiinpano</h2>

        <form onSubmit={this.addNote}>
          <input
            value={this.state.new_note}
            onChange={this.handleNoteChange}
          />
          <button>tallenna</button>
        </form>

        <h2>Muistiinpanot</h2>

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

      </div >
    ) 
  }
}

export default App