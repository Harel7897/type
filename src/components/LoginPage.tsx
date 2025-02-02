import React, { useState, useContext } from 'react';
import Dialog from './Dialog';
import './LoginPage.css';
import { AuthContext } from './AuthContext';

const LoginPage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [error1, setError1] = useState<string>('');
  const [error2, setError2] = useState<string>('');
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext not found');
  }

  const { setUsername, setToken, setChosenPage } = authContext;

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const validateInputs = (): boolean => {
    let isValid = true;

    if (input1.length < 6) {
      setError1('Input must be at least 6 characters long');
      isValid = false;
    } else {
      setError1('');
    }

    const hasUppercase = /[A-Z]/.test(input2);
    const hasLowercase = /[a-z]/.test(input2);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(input2);
    const hasMinLength = input2.length >= 8;

    if (!hasMinLength) {
      setError2('Input must be at least 8 characters long');
      isValid = false;
    } else if (!hasUppercase) {
      setError2('Input must contain at least one uppercase letter');
      isValid = false;
    } else if (!hasLowercase) {
      setError2('Input must contain at least one lowercase letter');
      isValid = false;
    } else if (!hasSymbol) {
      setError2('Input must contain at least one symbol');
      isValid = false;
    } else {
      setError2('');
    }

    return isValid;
  };

  const handleConnect = () => {
    if (validateInputs()) {
      setUsername(input1);
      setToken(true);
      setChosenPage('Home');
    }
  };
  
  return (
    <div className="login-page">
      <h1 className='Titel'>Welcome to the Login Page</h1>
      <div className='B-center'>
         <button className="open-dialog-button" onClick={handleOpenDialog}>
        Open Dialog
      </button>
      </div>
     

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        width={400}
        height={300}
        draggble={true}
        className="custom-dialog"
      >
        <h2>Custom Dialog</h2>
        <h2>Enter your user name</h2>
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
        {error1 && <p style={{ color: 'red' }}>{error1}</p>}
        <h2>Enter your password</h2>
        <input
          type="password"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
        {error2 && <p style={{ color: 'red' }}>{error2}</p>}
        <button onClick={handleConnect}>Connect</button>
      </Dialog>
    </div>
  );
};

export default LoginPage;
