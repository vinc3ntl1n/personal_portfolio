import { useState, useRef } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link, useNavigate, Outlet} from "react-router-dom";
import "xp.css/dist/XP.css";
import Draggable from "react-draggable";
import image1 from "./assets/monkey.jpeg";
import image2 from "./assets/Vincent.PNG";
import winicon from "./assets/windows.png"
import logo from "./assets/logo.png"

function Pair(obj) {
  const [isVisible, toggleVisibility] = useToggle();
  const [count, setCount] = useState(0);
  const  shortRef = useRef(null);
  const winRef = useRef(null);
  const images = {
    monkey: image1,
    vincent: image2
  };

    // the shortcut
    return (
    <div>
      <Draggable nodeRef={shortRef} >
        <div ref = {shortRef} style={{ width: 80}} >
          <img src={images[obj.name]} alt={obj.name} draggable={false} onDoubleClick={toggleVisibility} className = "icon"/>
        </div>
      </Draggable>
      
      {isVisible && 
      <Draggable nodeRef={winRef}>
        <div ref = {winRef} style={{ width: 300}} className="window">
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

function Bottom() {
  return (
    <div className="title-bar bottom-bar">
      <div className="image-container">
        <img src = {winicon} className = "greentab"/>
        <div className="text">
            start
        </div>
        <img src = {logo} className = "logo"/>
      </div>
    </div>
  )
}

function App() {
  return (
    <div>
      <div>
        <Pair name = "monkey"/>
        <Pair name = "vincent"/>
      </div>
      <Bottom />
    </div>
    
  )
}

export default App
