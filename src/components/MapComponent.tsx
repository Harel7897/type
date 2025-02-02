// MapComponent.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css'; // חשוב לכלול את ה-CSS של Leaflet
import { useAuthContext } from './AuthContext';

const MapComponent: React.FC = () => {
  // מיקום ברירת מחדל למפה
  const position: LatLngExpression = [31.0461, 34.8516];
  const { setChosenPage } = useAuthContext();
  
  return (
    <div style={{ height: "100vh", width: "100%" }}> {/* 100% גובה ורוחב */}
      <button onClick={() => setChosenPage('Home')}>Back to Home</button>
      <button>+</button>
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%"}}>
        {/* הוספת רשת המפות */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* הוספת Marker ומספור הפופאפ */}
        <Marker position={position}>
          <Popup>Welcome to this location!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
