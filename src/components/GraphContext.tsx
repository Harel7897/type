import React, { createContext, useContext, useRef, ReactNode } from 'react';

// טיפוס הקונטקסט
interface GraphContextType {
  netRef: React.MutableRefObject<any>;
  setNetRef: (ref: any) => void;  // פונקציה להגדיר את ה-netRef
  addNode: (id: string, title: string, color: string) => void;
}

// יצירת הקונטקסט
const GraphContext = createContext<GraphContextType | undefined>(undefined);

// ספק הקונטקסט (Provider)
const GraphProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
const netRef = useRef<any>(null);  // יצירת ה-useRef עבור הגרף



 // פונקציה להוספת Node חדש
 const addNode = (id: string, title: string, color: string) => {
    if (netRef.current) {
      const network = netRef.current;
      const data = network.body.data;
      data.nodes.add({
        id: id, // שם ה-Node כ-id
        label: title, // התווית של ה-Node
        color: color, // צבע ה-Node
      }); 
      network.fit(); // מבצע הזזה אוטומטית כך שכל ה-Node יהיו נראים
    } else {
      console.warn("Network reference is not available.");
    }
  };

  const setNetRef = (ref: any) => {
    netRef.current = ref;
  };
  
  return (
    <GraphContext.Provider value={{ netRef, setNetRef ,addNode }}>
      {children}
    </GraphContext.Provider>
  );
};

// הוק מותאם אישית לגישה לקונטקסט
const useGraphContext = (): GraphContextType => {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error('useGraphContext must be used within a GraphProvider');
  }
  return context;
};

export { GraphProvider, useGraphContext };
