import "./App.css";
import OpenAI from 'openai';
import { useState, useEffect } from "react";
import OptionSelection from "./components/OptionSelection";
import Translation from "./components/Translation";
import { arrayItems } from "./AIOptions";

function App() {

  console.log(process.env.REACT_APP_OPENAI_API_KEY)
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true // This is also the default, can be omitted
  });
  const [option, setOption] = useState({});
  const [optionData, setOptionData] = useState({});
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const [chatstate, setChatstate] = useState([])

  console.log(input, result)

  useEffect(() => {
    setChatstate([
      ...chatstate,
      {
        user: input,
        system: result
      }
    ])
  }, [result])

  const filterresult = chatstate.filter((v, i) => {
    return i % 2 === 1;
  });

  // console.log(import.meta.env.VITE_Open_AI_Key);
  const selectOption = (option) => {
    setOption(option.option);
    console.log(option.name)
    setOptionData(option.name);
  };

  const selectOptionBack = (option) => {
    setOption(option);
  };

  console.log(option)

  // const doStuff = async () => {
  //   const object = { ...option, prompt: input };

  //   const response = await openai.completions.create(object);

  //   setResult(response.choices[0].text);
  // };

  const doStuff = async () => {
    // Create a list of messages for the conversation
    if (option.model === "gpt-3.5-turbo") {
      const messages = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: input }, // Use the input as a user message
      ];

      // Use the v1/chat/completions endpoint for chat models
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // or your specific chat model
        messages: messages,
      });

      console.log(response)
      // Extract and set the result from the assistant's reply
      setResult(response.choices[0].message.content);
    } else if (option.model === "code-davinci-edit-001") {
      const originalText = input; // Store the original text

      // Create a list of edits with the original text
      const edits = [
        {
          type: "edit",
          start: 0,
          end: input.length,
          content: "", // Replace with your edited content
        },
      ];

      // Request edits using the v1/edits endpoint
      const response = await openai.edits.create({
        model: "text-davinci-003", // Replace with your preferred model
        content: originalText,
        edits,
      });

      // Extract the edited text from the response
      const editedText = response.choices[0].text;

      setResult(editedText);

    }
    else if (option.model === "gpt-3.5-turbo-16k") {
      const messages = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: input }, // Use the input as a user message
      ];

      // Use the v1/chat/completions endpoint for chat models
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // or your specific chat model
        messages: messages,
      });

      console.log(response)
      // Extract and set the result from the assistant's reply
      setResult(response.choices[0].message.content);
    }
    else {
      const object = { ...option, prompt: input };

      const response = await openai.completions.create(object);

      setResult(response.choices[0].text);
    }

  };




  return (
    <div className="App">
      {Object.values(option).length === 0 ? (
        <OptionSelection arrayItems={arrayItems} selectOption={selectOption} />
      ) : (
        <Translation doStuff={doStuff} setInput={setInput} title={optionData} resultchat={filterresult} result={result} selectOptionBack={selectOptionBack} />
      )}
    </div>
  );
}

export default App;
