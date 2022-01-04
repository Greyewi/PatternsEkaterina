import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from "./Components/BuilderDropdown";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Dropdown title="Title" body="Body"/>
      </header>
    </div>
  );
}

export default App;
