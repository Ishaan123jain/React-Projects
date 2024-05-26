import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numAllowed, setNumAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null); 

const passwordSetter = useCallback(()=>{
  let pass=""
  let str="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasfdghjklzxcvbnm"
  if(numAllowed) str += "1234567890"
  if(charAllowed) str += "`~!@#$%^&*()-_=+{}|<>/?"
  for(let i=1; i<=length; i++){
    const index = Math.floor(Math.random()*str.length + 1)
    pass += str.charAt(index)
  }
  setPassword(pass)
},[length,charAllowed,numAllowed,setPassword]) 

const copyPasswordToClipBoard = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{
passwordSetter()
},[length,charAllowed,numAllowed,setPassword])
  return (
<>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500
     bg-gray-700">
      <h1 className="text-white text-center">Password Generator</h1>
      <div className="flex rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          placeholder='password'
          value = {password}
          readOnly
          ref={passwordRef}
          className="w-full py-1 px-3"
          />
          <button className="bg-blue-700 text-white px-3 py-0.5" onClick={copyPasswordToClipBoard} >copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={99}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>setLength(e.target.value)}
            />
            <label>length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked={numAllowed}
          id="numbers"
           onChange={()=>{
            setNumAllowed((prev)=>!prev)}
             }
          />
          <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="characters"
           onChange={()=>{
            setCharAllowed((prev)=>!prev)}
             }
          />
          <label>Characters</label>
        </div>
        
      </div>
    </div>
</>
   
  )
}

export default App
