import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const Map = ({ setUbicacion }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [address, setAddress] = useState("");

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data.display_name) {
        setUbicacion(data.display_name);
        setAddress(data.display_name);
      } else {
        setAddress("Dirección no encontrada");
      }
    } catch (error) {
      console.error("Error obteniendo la dirección:", error);
      setAddress("Error al obtener la dirección");
    }
  };

  return (
    <MapContainer
      center={[10.23639, -67.964998]}
      zoom={15}
      style={{ height: "300px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapEventsHandler
        setMarkerPosition={setMarkerPosition}
        fetchAddress={fetchAddress}
      />
      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>{address || "Obteniendo dirección..."}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

const MapEventsHandler = ({ setMarkerPosition, fetchAddress }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      fetchAddress(lat, lng);
    },
  });
  return null;
};
