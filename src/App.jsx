import "./App.css";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import MapContainer from "./components/MapContainer";

function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ height: "60px" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Places
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="page-content-container">
        <div className="page-content-container-map-container">
          <MapContainer />
        </div>
        <div className="page-content-container-list-container">list</div>
      </div>
    </>
  );
}

export default App;
