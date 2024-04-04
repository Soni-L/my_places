import { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import useLocalStorage from "use-local-storage";
import { Button, IconButton, Input, Paper, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const defaultCenter = {
  lat: 40.712776,
  lng: -74.005974,
};

const MapContainer = ({
  addLocationClick,
  selectedLocation,
  setSelectedLocation,
}) => {
  const [center, setCenter] = useState(defaultCenter);
  const [searchLocation, setSearchLocation] = useState("");
  const [currentMarkers, setCurrentMarkers] = useState([]);
  const [items] = useLocalStorage("my_locations", []);

  useEffect(() => {
    if (selectedLocation?.selectSource === "list") {
      setCenter({ lat: selectedLocation.lat, lng: selectedLocation.lng });
    }
  }, [selectedLocation]);

  useEffect(() => {
    setCurrentMarkers([]);
  }, [items]);

  const mapStyles = {
    height: "calc(100vh - 80px)",
    width: "100%",
  };

  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setCurrentMarkers([newMarker]);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setCenter({ lat, lng });
      } else {
        console.error("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const copyJsonToClipboard = (text) => {
    navigator.clipboard
      .writeText(JSON.stringify(text))
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={center}
          onClick={handleMapClick}
          mapTypeId="roadmap"
          options={{ mapTypeControl: false, streetViewControl: false }}
          style={{ position: "relative" }}
        >
          <Paper
            elevation={10}
            style={{
              position: "absolute",
              zIndex: "100",
              padding: "8px",
              backgroundColor: "white",
              borderRadius: "4px",
              borderBottom: "1px solid gray",
              borderRight: "1px solid gray",
              top: "2px",
              left: "2px",
            }}
          >
            <Input
              type="text"
              placeholder="Search location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </Paper>
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
              onClick={() =>
                setSelectedLocation({ id: marker.id, selectSource: "map" })
              }
            >
              {marker.id === selectedLocation.id && (
                <InfoWindowF position={marker}>
                  <div style={{ padding: 0 }}>
                    <Typography
                      style={{ padding: 0, color: "black" }}
                      variant="h6"
                    >
                      {marker.name}
                    </Typography>
                    <div
                      style={{
                        backgroundColor: "#f3e5f5",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        padding: "4px",
                        paddingTop: "19px",
                        borderRadius: "4px",
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          copyJsonToClipboard({
                            name: marker.name,
                            lat: marker.lat,
                            lng: marker.lng,
                          })
                        }
                        size="xs"
                        style={{
                          height: "15px",
                          width: "15px",
                          position: "absolute",
                          top: 2,
                          right: 2,
                        }}
                      >
                        <ContentCopyIcon
                          style={{ height: "15px", width: "15px" }}
                        />
                      </IconButton>
                      <Typography
                        style={{ padding: 0, color: "black" }}
                        variant="caption"
                      >
                        lat: {marker.lat}
                      </Typography>
                      <Typography
                        style={{ padding: 0, color: "black" }}
                        variant="caption"
                      >
                        lng: {marker.lng}
                      </Typography>
                    </div>
                  </div>
                </InfoWindowF>
              )}
            </MarkerF>
          ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapContainer;
