import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import MyForm from './Components/MyForm'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <div className="App">
      <MyForm />
    </div>
    {/* <img src={Wallpaper} className="wallpaper"/> */}
   </>
  )
}

export default App
