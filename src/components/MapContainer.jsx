import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

const MapContainer = () => {
  const [currentMarkers, setCurrentMarkers] = useState([]);

  const mapStyles = {
    height: "calc(100vh - 70px)",
    width: "100%",
  };

  const defaultCenter = {
    lat: 40.712776,
    lng: -74.005974,
  };

  const handleMapClick = (event) => {
    console.log("Clicked coordinates:", {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });

    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setCurrentMarkers([newMarker]);
  };

  const plusMarkerIcon = {
    url: "https://img.icons8.com/metro/26/000000/plus.png",
    // origin: new window.google.maps.Point(0, 0),
    // anchor: new window.google.maps.Point(13, 26),
    scaledSize: new window.google.maps.Size(36, 36),
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
        onClick={handleMapClick}
        mapTypeId="roadmap"
        options={{ mapTypeControl: false, streetViewControl: false }}
      >
        {currentMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
            clickable={true}
            icon={plusMarkerIcon}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
