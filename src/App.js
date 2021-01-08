import logo from './logo.svg';
import './App.css';
import { Component, createRef, useRef } from 'react';

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const phrases = ['test', 'phrase', 'pendu', 'developement', 'reussite', 'escalier', 'balancoire', 'aleatoire', 'eau', 'honteux', 'condamne', 'invitation', 'constante', 'signal', 'équivalent', 'autonomisation', 'mousse', 'commercial', 'conversion', 'elargir', 'banque', 'bijou']

class App extends Component {

  constructor (props) {
    super(props)
    const phrase = phrases[Math.floor(Math.random() * phrases.length)]
    this.handleLetterClick = this.handleLetterClick.bind(this)
    this.handleClickRestart = this.handleClickRestart.bind(this)
    this.handlerKeyDown = this.handlerKeyDown.bind(this)
    this.state = {
        usedLetters: [],
        phrase: phrase,
        attempts: 0
    }
  }

  handlerKeyDown (e) {
    e.preventDefault()
    if(e.keyCode > 64 && e.keyCode < 91) {
      const letter = String.fromCharCode(e.keyCode)
      this.setState({
        usedLetters: [...this.state.usedLetters, letter],
        phrase: this.state.phrase,
        attempts: this.state.attempts + 1
      })
      const button = createRef()
      button.className = "btn btn-secondary btn-lg disabled m-1"
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handlerKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", function() {

    })
  }


  handleLetterClick (letter) {
    this.setState({
      usedLetters: [...this.state.usedLetters, letter],
      phrase: this.state.phrase,
      attempts: this.state.attempts + 1
    })
  }

  handleClickRestart () {
    const phrase = phrases[Math.floor(Math.random() * phrases.length)]
    this.setState({
      usedLetters: [],
      phrase: phrase,
      attempts: 0
    })
  }

  render () {
    const text = computeDisplay(this.state.phrase, this.state.usedLetters)
    const endGame = text.includes('_') ? false : true
    return (
      <div className="App">
        <header className="App-header mt-4">
          <div className="header-title">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="title">JEU DU PENDU</div>
          </div>
          <div className="attempts">Essais : {this.state.attempts}</div>
        </header>
        <div className="main container mt-5">
          <div className="text-center">
            <div className="masque p-5">{text}</div>
            <div className="buttons p-5">
              {endGame
              ? <div><h1>GAGNÉ</h1><button className="btn btn-info btn-lg" value="restart" onClick={this.handleClickRestart}>Rejouer</button></div>
              : <Buttons onClickButton={this.handleLetterClick}/>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function computeDisplay (phrase, usedLetters) {
  return phrase.replace(/\w/g, (letter) => (
    usedLetters.includes(letter) ? letter : '_'
  ))
}

class Buttons extends Component {

  constructor (props) {
    super(props)
    this.handleLetterClick = this.handleLetterClick.bind(this)
  }

  handleLetterClick (e) {
    e.preventDefault()
    this.props.onClickButton(e.target.value)
    e.target.className = "btn btn-secondary btn-lg disabled m-1"
  }

  render () {
    return <div>
      {alphabet.map((letter) => {
        return <button id={letter} className="btn btn-info btn-lg m-1" value={letter} key={letter} onClick={this.handleLetterClick}>{letter}</button>
      })}
    </div>
  }
}

export default App;
