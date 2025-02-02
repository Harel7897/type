import React, { useState } from 'react';
import { useAuthContext } from './components/AuthContext';
import HomePage from './components/HomePage'; 
import ListPage from './components/ListPage'; 
import LoginPage from './components/LoginPage'; 
import MapComponent from './components/MapComponent';

const App: React.FC = () => {
  const { token, chosenPage } = useAuthContext();
 
  return (
    <>
      {token ? (
        <div > 
          <div
            style={{
              opacity: chosenPage === 'Home' ? 1 : 0,  // opacity של HomePage
              zIndex: chosenPage === 'Home' ? 1000 : -1,  // z-index של HomePage
              position: chosenPage === 'Home' ? 'relative' : 'absolute', // וודא ש-HomePage לא יתפוס מקום כשמוסתר
              top: chosenPage === 'Home' ? '0' : '-9999px', // אם לא מוצג, העבר אותו מחוץ למסך
            }}
          >
            {<HomePage />}
          </div>

          <div
            style={{
              width: '100%',
              height: "100%",
              opacity: chosenPage === 'Map' ? 1 : 0,  // opacity של ListPage
              zIndex: chosenPage === 'Map' ? 1000 : -1,  // z-index של ListPage
              position: chosenPage === 'Map' ? 'relative' : 'absolute', // וודא ש-HomePage לא יתפוס מקום כשמוסתר
              top: chosenPage === 'Map' ? '0' : '-9999px', // אם לא מוצג, העבר אותו מחוץ למסך
            }}
          >
            {<MapComponent/> }

          </div>
           





          {/* הצגת ListPage */}
          <div
            style={{
              opacity: chosenPage === 'List' ? 1 : 0,  // opacity של ListPage
              zIndex: chosenPage === 'List' ? 1000 : -1,  // z-index של ListPage
              position: chosenPage === 'List' ? 'relative' : 'absolute', // וודא ש-ListPage לא יתפוס מקום כשמוסתר
              top: chosenPage === 'List' ? '0' : '-9999px', // אם לא מוצג, העבר אותו מחוץ למסך
              transition: 'opacity 0.3s ease, z-index 0.3s ease, top 0.3s ease', // אנימציה
            }}
          >
            { <ListPage />}
          </div>
        </div>
      ) : (
        // אם אין token, הצג את LoginPage
        <LoginPage />
      )}
    </>
  );
};

export default App;
