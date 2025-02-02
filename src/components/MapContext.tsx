import React, { createContext, ReactNode, useRef } from 'react';

// הגדרת טיפוס עבור הקונטקסט
interface MapcontextType {
  mapRef: React.MutableRefObject<any>;
}

// יצירת הקונטקסט
const MapContext = createContext<MapcontextType | undefined>(undefined);

// ספק הקונטקסט (MapProvider)
const MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const mapRef = useRef<any>(null);  // יצירת ה-useRef עבור הגרף

  return (
    <MapContext.Provider value={{ mapRef }}>
      {children}  {/* מחזירים את ה-children כך שהקומפוננטות שנמצאות בתוכו יקבלו את ה-netRef */}
    </MapContext.Provider>
  );
};

export default MapProvider;
