import "./App.css";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MapContainer from "./components/MapContainer";
import { useState } from "react";
import AddLocationDialog from "./components/AddLocationDialog";
import useLocalStorageArray from "./hooks/useLocalStorageArray";

function App() {
  const { items, deleteItem } = useLocalStorageArray();
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

        <div className="page-content-container-list-container">
          <List>
            {items.map((item) => (
              <ListItem key={item.id}>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteItem(item.id)}
                  >
                    <DeleteIcon style={{ color: "red" }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <AddLocationDialog
        dialogOptions={addLocationDialog}
        handleClose={() => setAddLocationDialog({ open: false })}
      />
    </>
  );
}

export default App;
