import React from 'react'



function useToggle(initialValue = false) {
  const [isVisible, setIsVisible] = useState(initialValue)

  function toggle() {
    setIsVisible(prevState => !prevState)
  }

  return [isVisible, toggle]
}


function ToggleComponent() {
  const [isVisible, toggleVisibility] = useToggle()

  return (
    <div>
      <button onClick={toggleVisibility}>Toggle Visibility</button>
      {isVisible && <div>This component is visible.</div>}
    </div>
  )
}

export default ToggleComponent