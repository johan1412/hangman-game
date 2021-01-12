import logo from './logo.svg';
import image1 from './images/pendu1.svg';
import image2 from './images/pendu2.svg';
import image3 from './images/pendu3.svg';
import image4 from './images/pendu4.svg';
import image5 from './images/pendu5.svg';
import image6 from './images/pendu6.svg';
import image7 from './images/pendu7.svg';
import image8 from './images/pendu8.svg';
import image9 from './images/pendu9.svg';
import image10 from './images/pendu10.svg';
import image11 from './images/pendu11.svg';
import './App.css';
import { Component } from 'react';

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const phrases = ['test', 'phrase', 'pendu', 'developement', 'reussite', 'escalier', 'balancoire', 'aleatoire', 'eau', 'honteux', 'condamne', 'invitation', 'constante', 'signal', 'equivalent', 'autonomisation', 'mousse', 'commercial', 'conversion', 'elargir', 'banque', 'bijou']

class App extends Component {

  constructor (props) {
    super(props)
    const phrase = phrases[Math.floor(Math.random() * phrases.length)]
    this.handleLetterClick = this.handleLetterClick.bind(this)
    this.handleClickRestart = this.handleClickRestart.bind(this)
    this.handlerKeyDown = this.handlerKeyDown.bind(this)
    this.updateImage = this.updateImage.bind(this)
    this.state = {
        usedLetters: [],
        phrase: phrase,
        wrongLetters: 0,
        image: image1
    }
  }

  handlerKeyDown (e) {
    e.preventDefault()
    if(e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toLowerCase()
      const isIncluded = includeLetter(letter, this.state.phrase)
      const image = isIncluded ? this.state.image : this.updateImage()
      this.setState({
        usedLetters: [...this.state.usedLetters, letter],
        phrase: this.state.phrase,
        wrongLetters: isIncluded ? this.state.wrongLetters : this.state.wrongLetters + 1,
        image: image
      })
    }
  }

  componentDidMount () {
    document.addEventListener("keydown", this.handlerKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener("keydown", function() {

    })
  }

  updateImage () {
    switch (this.state.image) {
      case image1: return image2;
      case image2: return image3;
      case image3: return image4;
      case image4: return image5;
      case image5: return image6;
      case image6: return image7;
      case image7: return image8;
      case image8: return image9;
      case image9: return image10;
      case image10: return image11;
      case image11: return image11;
      default: return this.state.image
    }
  }


  handleLetterClick (letter) {
    const isIncluded = includeLetter(letter, this.state.phrase)
    const image = isIncluded ? this.state.image : this.updateImage()
    this.setState({
      usedLetters: [...this.state.usedLetters, letter],
      phrase: this.state.phrase,
      wrongLetters: isIncluded ? this.state.wrongLetters : this.state.wrongLetters + 1,
      image: image
    })
  }

  handleClickRestart () {
    const phrase = phrases[Math.floor(Math.random() * phrases.length)]
    this.setState({
      usedLetters: [],
      phrase: phrase,
      wrongLetters: 0,
      image: image1
    })
  }

  render () {
    const text = computeDisplay(this.state.phrase, this.state.usedLetters)
    const gameWin = text.includes('_') ? false : true
    const gameLost = this.state.wrongLetters >= 10 ? true : false
    let elt = <div></div>
    if(gameWin) {
      elt = <div>
        <h1>GAGNÉ</h1>
        <button className="btn btn-info btn-lg" value="restart" onClick={this.handleClickRestart}>Rejouer</button>
      </div>
    } else if(gameLost) {
      elt = <div>
        <h1>PERDU</h1>
        <button className="btn btn-info btn-lg" value="restart" onClick={this.handleClickRestart}>Rejouer</button>
      </div>
    } else { 
      elt = <Buttons onClickButton={this.handleLetterClick}/>
    }

    return (
      <div className="App">
        <header className="App-header mt-4">
          <div className="header-title">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="title">JEU DU PENDU</div>
          </div>
        </header>
        <div className="main container mt-5">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="image"><img className="img-fluid" src={this.state.image} alt="pendu decoration"/></div>
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="text-center">
                <div className="masque p-5">{text}</div>
                <div className="buttons p-5">{elt}</div>
              </div>
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

function includeLetter(letter, phrase) {
  return phrase.includes(letter)
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
