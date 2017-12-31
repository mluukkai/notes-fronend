import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

/*
class App4 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pisteet: {
        hu: 0,
        ne: 0,
        hy: 0,
      },
      kaikki: []
    }
  }

  klik = (nappi) => () => {
    const pisteet = { ...this.state.pisteet, [nappi]: this.state.pisteet[nappi] + 1 }
    this.setState({pisteet})
    //this.setState({ pisteet: Object.assign({}, this.state.pisteet, { [nappi]: this.state.pisteet[nappi]+1 } )})
  } 

  render() {
    const palautteitaYhteensa = () => Object.values(this.state.pisteet).reduce((s, p)=>s+p,0)

    const ka = () => {
      const sum = this.state.pisteet.hy - this.state.pisteet.hu
      const yht = palautteitaYhteensa()
      return (yht === 0 ? 0 : sum / yht).toFixed(1)
    }

    const pos = () => {
      const yht = palautteitaYhteensa()
      return (yht === 0 ? 0 : 100 * this.state.pisteet.hy / palautteitaYhteensa()).toFixed(1)
    }

    return (
      <div>
        <h2>anna palatetta</h2>
        <button onClick={this.klik('hy')}>hyvä</button>
        <button onClick={this.klik('ne')}>neutraali</button>
        <button onClick={this.klik('hu')}>huono</button>
        <div>
          <h2>statistiikka</h2>
          <table>
            
              <tr>
                <td>hyvä</td>
                <td>{this.state.pisteet['hy']}</td>
              </tr>
              <tr>
                <td>neutraali</td>
                <td>{this.state.pisteet['ne']}</td>
              </tr>
              <tr>
                <td>huono</td>
                <td>{this.state.pisteet['hu']}</td>
              </tr>
              <tr>
                <td>keskiarvo</td>
                <td>{ka()}</td>
              </tr>
              <tr>
                <td>positiivisia</td>
                <td>{pos()} %</td>
              </tr>
             
          </table>
        </div>
      </div>
    )
  }
}

class App3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vasen: 0,
      oikea: 0,
      kaikki: []
    }
  }

  klikVasen = ()=> {
    this.setState({
      vasen: this.state.vasen+1,
      kaikki: this.state.kaikki.concat('v')
    })
  }

  klikOikea = () => {
    this.setState({ 
      oikea: this.state.oikea + 1,
      kaikki: this.state.kaikki.concat('o') 
    })
  }

  render(){
    const historia = () => {
      if (this.state.kaikki.length === 0) {
        return <div>zero clicks!</div>
      }
      return (
        <div>
          näppäilyhistoria {this.state.kaikki.join(' ')}
        </div>
      )
    }
    return(
      <div>
        <div>
          {this.state.vasen}
          <button onClick={this.klikVasen}>vasen</button> 
          <button onClick={this.klikOikea}>oikea</button> 
          {this.state.oikea}
          <div>{historia()}</div>
        </div>
      </div>
    )
  }
}

class App10 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0], 
      favorite: 0
    }
  }

  newAnecdote = () => {
    const selection = Math.floor(Math.random() * this.props.anecdotes.length)
    this.setState({ selected: selection })
  }

  vote = () => {
   // console.log(this.state.selected)
    const votes = this.state.votes.concat(this.state.selected)

    const hits = {}
    votes.forEach(v=>{
      if ( hits[v]===undefined ){
        hits[v] = 0
      }
      hits[v] += 1
    })


    let most = 0
    Object.keys(hits).forEach((k)=>{
      //console.log('h', k, hits[k], hits[most])
      if (hits[most] ===undefined || hits[k]>hits[most]) {
        most = k
      }
    })
    
    this.setState({ votes, favorite: most })
  }

  render() {
    const votes = (number) => {
      return this.state.votes.filter(v => v === number).length
    }

    console.log(votes())

    return (
      <div>
        <div>
          <div>{this.props.anecdotes[this.state.selected]}</div>
          <div>has {votes(this.state.selected)} votes</div>
        </div>  
        <button onClick={this.vote}>vote</button>
        <button onClick={this.newAnecdote}>next anecdote</button>
        <div>
          <h3>anecdote with most votes:</h3>
            <div>{this.props.anecdotes[this.state.favorite]}</div>
            <div>has {votes(this.state.favorite)} votes</div>
        </div>
      </div>
    )
  }
}

const anecdotes = [
  "If it hurts, fo it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
]

*/

/*
const notes = [
  {
    id: 1,
    content: "HTML on helppoa",
    date: "2017-12-10T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Selain pystyy suorittamaan vain javascriptiä",
    date: "2017-12-10T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "HTTP-protokollan tärkeimmät metodit ovat GET ja POST",
    date: "2017-12-10T19:20:14.298Z",
    important: true
  }
]

const Note = ({note}) => {
  return (
    <li>{note.content}</li>
  )
} 
*/

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

  /*
axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  ReactDOM.render(
    <App notes={notes} />,
    document.getElementById('root')
  ) 
})

*/