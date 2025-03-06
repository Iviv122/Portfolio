import { JSX, useEffect, useRef, useState } from 'react'
import './App.css'
import Color from './utils/Color';
import ListProjects from './commands/ls';
import ListLinks from './commands/Links';
import Neofetch from './commands/Neofetch';
import Help from './commands/Help';

function App() {

  const[input,setInput] = useState("");

  const [output, setOutput] = useState<JSX.Element[]>([
    <div key={0}>
      Welcome to my page! <br />
      Use {Color("help","#8be9fd")} to see commands <br /><br />
    </div>
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(()=>{
    inputRef.current?.focus();
  },[])



  function HandleInput(input : string){
    console.log(input);
    switch (input) {
      case "help":
          return Help(); 
      case "clear":
        setOutput([]);
        return ; 
      case "links":
        return ListLinks();
      case "ls":
        return ListProjects();
      case "neofetch":
        return Neofetch();
      default:
        return <div>Uknown command, use {Color("help","#8be9fd")} to check them</div>;
    }
  }

  return (
    <div className='bg-[#1d1f21] h-[100vh] text-[#c5c8c6] p-[1em] box-border'
      onClick={()=>{inputRef.current?.focus();}}
    >
      <div className='whitespace-pre-line'>{output}</div>
      <div className='flex'>
        <span className='text-[#8be9fd]'>iviv122</span>
        <span className='text-[#50fa7b]'>@Home</span>
        <span>~$</span> 
        <input type='text'
        ref={inputRef}
        value={input}
        onChange={e=>setInput(e.target.value)}
        onKeyDown={e=>{
          if(e.key === "Enter"){
            setOutput(oldOutput=>[
              ...oldOutput,
              <div>
                <span className='text-[#8be9fd]'>iviv122</span> 
                <span className='text-[#50fa7b]'>@Home</span>
                <span>~${input} </span>
                <div>{HandleInput(input)}</div>
              </div> 
              ]);

            HandleInput(input);

            setInput("");
          }
        }}
        className='border-[none] m-[0] p-[0] outline-none bg-transparent text-[#c5c8c6] w-[100%]'
        ></input>
      </div>
    </div>
  )
}

export default App
