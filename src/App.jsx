import "./App.css";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import MapContainer from "./components/MapContainer";
import { useState } from "react";
import AddLocationDialog from "./components/AddLocationDialog";

function App() {
  const [addLocationDialog, setAddLocationDialog] = useState({ open: false });

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
          <MapContainer
            addLocationClick={(event) => {
              setAddLocationDialog({ open: true, ...event });
            }}
          />
        </div>
        <div className="page-content-container-list-container">list</div>
      </div>
      <AddLocationDialog
        dialogOptions={addLocationDialog}
        handleClose={() => setAddLocationDialog({ open: false })}
      />
    </>
  );
}

export default App;
