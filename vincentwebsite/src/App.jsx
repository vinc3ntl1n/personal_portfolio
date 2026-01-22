import { useState, useRef } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link, useNavigate, Outlet} from "react-router-dom";
import "xp.css/dist/XP.css";
import Draggable from "react-draggable";




function App() {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef}>
      <div ref = {nodeRef} style={{ width: 300, }} className="window">
        <div className="title-bar">
          <div className="title-bar-text">Counter</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>

        <div className="window-body">
          <p style={{ textAlign: "center" }}>Current count: {count}</p>
          <div className="field-row" style={{ justifyContent: "center" }}>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>0</button>
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export default App
