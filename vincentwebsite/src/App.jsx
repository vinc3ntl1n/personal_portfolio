import { useState, useRef } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link, useNavigate, Outlet} from "react-router-dom";
import "xp.css/dist/XP.css";
import Draggable from "react-draggable";
import monkey from "./assets/monkey.jpeg";

function Pair(name) {
  const [isVisible, toggleVisibility] = useToggle();
  const [count, setCount] = useState(0);
  const  shortRef = useRef(null);
  const winRef = useRef(null);

    // the shortcut
    return (
    <div>
      <Draggable nodeRef={shortRef} >
        <div ref = {shortRef} style={{ width: 300}} >
          <img src={name} alt={name} draggable={false} onDoubleClick={toggleVisibility}/>
        </div>
      </Draggable>
      
      {isVisible && 
      <Draggable nodeRef={winRef}>
        <div ref = {winRef} style={{ width: 300}} className="window" id = {name}>
          <div className="title-bar">
            <div className="title-bar-text">Counter</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize" />
              <button aria-label="Maximize" />
              <button aria-label="Close" onClick={toggleVisibility}/>
            </div>
          </div>

          <div className="window-body">
            <p style={{ textAlign: "center" }}>banana count: {count}</p>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <button onClick={() => setCount(count + 1)}>+</button>
              <button onClick={() => setCount(count - 1)}>-</button>
            </div>
          </div>
        </div>
      </Draggable> 
      }
    </div>
    )
  
}

function useToggle(initialValue = false) { //the image but trying to be able to toggle the image
  const [isVisible, setIsVisible] = useState(initialValue)

  function toggle() {
    setIsVisible(prevState => !prevState)
  }

  return [isVisible, toggle]
}

function App() {
  return (
    <div>
      <Pair name = "monkey"/>
      <Pair name = "zebra"/>
    </div>
  )
}

export default App
