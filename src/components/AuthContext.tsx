import React, { createContext, useState, ReactNode, useContext } from 'react';

// יצירת הקונטקסט
interface AuthContextProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  token: boolean;
  setToken: React.Dispatch<React.SetStateAction<boolean>>;
  chosenPage: string;
  setChosenPage: React.Dispatch<React.SetStateAction<string>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string>('');
  const [token, setToken] = useState<boolean>(false);
  const [chosenPage, setChosenPage] = useState<string>('Home');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{ username, setUsername, token, setToken, chosenPage, setChosenPage, darkMode, setDarkMode }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = (): AuthContextProps=> {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
  };