import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [resobj, setResobj] = useState({});
  const inputRef = useRef(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://server-mpgi.vercel.app/checkId", {
        studentId: inputValue,
      });

      setResobj(res);
      console.log(res);
    } catch (e) {
      console.error("Error:", e);
    }
  };

  useEffect(() => {
    // Focus on the input element when the component mounts or after submission
    inputRef.current && inputRef.current.focus();
  }, [resobj]);

  useEffect(() => {
    // Logic to execute after setting the state
    if (resobj.status === 200) {
      toast.success("Entry allowed");
    } else if (resobj.status === 201) {
      toast.error("Already entered");
    } else if (resobj.status === 204) {
      toast.error("No ID in input");
    } else {
      toast.error("No entry allowed");
    }
    setInputValue("");
  }, [resobj]);



  const handleKeyDown = (e) => {
    // Handle Enter key press to submit the form
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="app-container">
      <ToastContainer theme='dark' />
      <div className="form-container">
        <input
          type="text"
          placeholder="Enter something..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default App;


