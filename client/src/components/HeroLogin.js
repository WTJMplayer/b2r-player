import React, { useState } from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroLogin.css';

function HeroSection() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'userName') {
      setUserName(inputValue);
    } else {
      setPassword(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setUserName('');
    setPassword('');
  };

  return (
    <div className='hero-container'>
      <h1>Bach 2 Rock</h1>
      <div className='hero-btns'>
      <form className="form">
        <input
          value={userName}
          name="userName"
          onChange={handleInputChange}
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
        />
      </form>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={handleFormSubmit}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;