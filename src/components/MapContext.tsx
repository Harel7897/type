import L from 'leaflet';
import React, { createContext, ReactNode, useContext, useRef } from 'react';

// הגדרת טיפוס עבור הקונטקסט
interface MapcontextType {
  mapRef: React.MutableRefObject<any>;
  addMarker:(lat:number,lon:number, color: string, titel: string)=>void;
}

// יצירת הקונטקסט
const MapContext = createContext<MapcontextType | undefined>(undefined);

// ספק הקונטקסט (MapProvider)
export const MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const mapRef = useRef<any>(null);  // יצירת ה-useRef עבור הגרף

  const addMarker = (lat: number, lon: number, title: string, color: string) => {
    if (mapRef.current) {
        
      // הוספת קודקוד חדש למפה ב-Lat, Lon אקראיים
      const newMarker = L.marker([lat, lon],{
        icon: L.divIcon({
            className: 'custom-icon',
            html: `<div style="background-color: ${color}; padding: 10px; border-radius: 50%; width: 20px; height: 20px;"></div>`,
          }),
      }).addTo(mapRef.current);
       newMarker.bindPopup(`<b>${title}</b>`).openPopup();
    }
  };

  return (
    <MapContext.Provider value={{ mapRef,addMarker }}>
      {children} 
    </MapContext.Provider>
  );
};
export const useMapContext = (): MapcontextType => {
    const context = useContext(MapContext);
    if (!context) {
      throw new Error('useMapContext must be used within a MapProvider');
    }
    return context;
  };
