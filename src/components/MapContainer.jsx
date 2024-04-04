import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

const MapContainer = ({addLocationClick}) => {
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
          <MarkerF
            key={index}
            position={marker}
            clickable={true}
            onClick={() => addLocationClick(marker)}
            icon={{
              url: "/icons/AddLocation.png",
              scaledSize: new window.google.maps.Size(46, 46),
            }}
          >
            <InfoWindowF position={marker}>
              <div>
                <h4 style={{ color: "black" }}>Click on the marker to save location</h4>
              </div>
            </InfoWindowF>
          </MarkerF>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
