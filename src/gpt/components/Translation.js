import React, {useState, useEffect} from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import Iconify from "../../components/iconify/Iconify";

export default function Translation({ doStuff, setInput, result, resultchat , title, selectOptionBack }) {
  console.log(resultchat)
  const [writeInput, setWriteInput] = useState("")

  const handleActions = () =>{
    setInput(writeInput)
    doStuff()
  }
  
  const [text, setText] = useState('');
  const message = 'Try out Something on GPT...';
  const delay = 0;

  console.log(text)

  useEffect(() => {
    let index = -1;

    const intervalId = setInterval(() => {
      if (index < message.length) {
        setText((prevText) =>  `${prevText}${result.charAt(index)}`);
        index += 1;
      } else {
        clearInterval(intervalId); 
      }
    }, delay);

    return () => {
      clearInterval(intervalId); 
    };
  }, []);

  useEffect(() => {
    let index = -1;

    const intervalId = setInterval(() => {
      if (index < result.length) {
        console.log(index )
        setText((prevText) => `${prevText}${result.charAt(index)}`);
        index += 1;
      } else {
        clearInterval(intervalId); 
      }
    }, delay);

    return () => {
      clearInterval(intervalId); 
      setText("")
    };
  }, [result]);


  return (
    title !== "Chat" ? <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignContent:'start' }}>

        <h3>{title}</h3>
        <Button label="Back" icon="pi pi-arrow-left" className="p-button-text" onClick={() => selectOptionBack({})} />
      </div>
      <InputTextarea
        className="text-area"
        label={title}
        cols={72}
        rows={3}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button className="action-btn" onClick={doStuff}>
        Send <Iconify icon="formkit:submit"/>
      </Button>

      <h3 className="result-text">{text.length > 0 ? `${text}` : text }</h3>
    </> : <div> <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,  backgroundColor: '#2065D1' }}>

      <h3>{title}</h3>
      <Button label="Back" icon="pi pi-arrow-left" className="p-button-text" onClick={() => selectOptionBack({})} />
    </div>
    <InputTextarea
        className="text-area"
        label={title}
        cols={72}
        rows={3}
        onChange={(e) => setWriteInput(e.target.value)}
      />
      <Button className="action-btn" onClick={handleActions} style={{ backgroundColor: '#2065D1', justifyContent:'center'}}>
        Send <Iconify icon="formkit:submit"/>
      </Button>
      <h3 className="result-text">{result.length > 0 ? result : ""}</h3>
    </div>
  );
}
