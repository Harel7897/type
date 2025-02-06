import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLng } from 'leaflet'; 
import 'leaflet/dist/leaflet.css'; 
import { useAuthContext } from './AuthContext';
import { useMapContext } from './MapContext';
import { useGraphContext } from './GraphContext';
import CustomDialog from './CustomDialog';
import './MapComponent.css'

const MapComponent: React.FC = () => {
  const { mapRef, addMarker } = useMapContext();
  const [markers, setMarkers] = useState<any[]>([]);  // מערך של אובייקטים עם כל המידע
  const [openDialog, setOpenDialog] = useState(false);
  const { addNode } = useGraphContext();

  const { setChosenPage } = useAuthContext();

  useEffect(() => {
    if (mapRef.current) {
      console.log('map is ready');
    }
  }, [mapRef]);

  const handleopenDialog = () => {
    setOpenDialog(true);
  };

  const handlecloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmitDialog = (data: { text: string; color: string }) => {
    const lat = 31.7683 + (Math.random() * 0.1 - 0.05);  
    const lng = 35.2173 + (Math.random() * 0.1 - 0.05);
    const newLatLng = new LatLng(lat, lng);

    // הוספת מרקר חדש למפה
    addMarker(newLatLng.lat, newLatLng.lng, data.text, data.color);

    // הוספת Node לגרף
    addNode(data.text, data.text, data.color);

    // הוספת ה- LatLng לסטייט
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { lat: newLatLng.lat, lng: newLatLng.lng, text: data.text, color: data.color },
    ]);

    setOpenDialog(false); // סוגר את הדיאלוג אחרי השליחה
  };

  return (
    <div style={{ height: '95vh', width: '100%' }}>
      <div className='B4-center'>
        <button className='ButtontoHome' onClick={() => setChosenPage('Home')}>Back to Home</button>
        <button className='ButtonD' onClick={handleopenDialog}>+</button>
      </div>

      <MapContainer center={[31.7683, 35.2173]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* הצגת Markers */}
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]} icon={L.divIcon({
            className: 'custom-icon',
            html: `<div style="background-color: ${marker.color}; padding: 10px; border-radius: 50%; width: 20px; height: 20px;"></div>`
          })}>
            <Popup>{marker.text}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <div>
        <CustomDialog
          isOpen={openDialog}
          onClose={handlecloseDialog}
          onSubmit={handleSubmitDialog}
        />
      </div>
    </div>
  );
};

export default MapComponent;
