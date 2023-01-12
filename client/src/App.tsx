import React from 'react';
import './App.css';
import { Banner } from "./components/Banner";
import {  InteractiveApp} from "./components/InteractiveApp";

function App() {
  return (
    <div className="App">
      <Banner/>
      <InteractiveApp/>
    </div>
  );
}

export default App;
