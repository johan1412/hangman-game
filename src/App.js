import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header mt-4">
        <div className="header-title">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="title">JEU DU PENDU</div>
        </div>
      </header>
    </div>
  );
}

function computeDisplay(phrase, usedLetters) {
  return phrase.replace(/\w/g, (letter) => (
    usedLetters.includes(letter) ? letter : '_'
  ))
}

export default App;
