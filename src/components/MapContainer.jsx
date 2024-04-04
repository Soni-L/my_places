import { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import useLocalStorage from "use-local-storage";

const MapContainer = ({ addLocationClick }) => {
  const [currentMarkers, setCurrentMarkers] = useState([]);
  const [items] = useLocalStorage("my_locations", []);

  useEffect(() => {
    setCurrentMarkers([]);
  }, [items]);

  const mapStyles = {
    height: "calc(100vh - 80px)",
    width: "100%",
  };

  const defaultCenter = {
    lat: 40.712776,
    lng: -74.005974,
  };

  const handleMapClick = (event) => {
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
                <h4 style={{ color: "black" }}>
                  Click on the marker to save location
                </h4>
              </div>
            </InfoWindowF>
          </MarkerF>
        ))}

        {"Saved locations"}
        {items.map((marker) => (
          <MarkerF
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            clickable={true}
          ></MarkerF>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
