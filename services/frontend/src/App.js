import logo from './logo.svg';
import './App.css';
import WdataComponent from './components/WdataComponent';
import EchartComponent from './components/EchartComponent';

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
  */}
    <EchartComponent />
      
    </div>
  );
}

export default App;
