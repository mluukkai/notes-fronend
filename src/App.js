import React from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'

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
    
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      noteService.setToken(user.token)
    }
  }

  login = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username, 
        password: this.state.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      noteService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleNoteChange = (e) => {
    this.setState({ new_note: e.target.value })
  }

  handleLoginFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
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
    
    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>
            
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
                <input
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
              name='username'
            />
          </div>
          <div>
            salasana
                <input
              type='password'
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
              name='password'
            />
          </div>
          <button>kirjaudu</button>
        </form> 
      </div>
    )

    const noteForm = () => (
      <div>
        <h2>Luo uusi muistiinpano</h2>

        <form onSubmit={this.addNote}>
          <input
            value={this.state.new_note}
            onChange={this.handleNoteChange}
          />
          <button>tallenna</button>
        </form>
      </div>
    )

    return (
      <div>
        <h1>Muistiinpanot</h1>

        <Notification message={this.state.error}/>

        {this.state.user === null ? 
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in</p>
            {noteForm()}
          </div>
        }

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

      </div>
    ) 
  }
}

export default App