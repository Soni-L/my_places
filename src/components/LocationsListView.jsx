import { List, ListItem, ListItemText, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import MyLocationIcon from "@mui/icons-material/MyLocation";

export default function LocationsListView({
  items,
  selectedLocation,
  setSelectedLocation,
  handleDelete,
}) {
  return (
      <List>
        {items.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "6px",
              margin: "3px",
              width: "270px",
            }}
          >
            <IconButton
              size="xs"
              onClick={() =>
                setSelectedLocation({ id: item.id, selectSource: "list" })
              }
            >
              {selectedLocation.id === item.id ? (
                <MyLocationIcon
                  sx={{ color: "#388e3c", height: "20px", width: "20px" }}
                />
              ) : (
                <LocationSearchingIcon
                  style={{ height: "20px", width: "20px" }}
                />
              )}
            </IconButton>
            <ListItemText sx={{ color: "black" }} primary={item.name} />
            <IconButton
              size="xs"
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(item)}
            >
              <DeleteIcon
                style={{ color: "red", height: "20px", width: "20px" }}
              />
            </IconButton>
          </ListItem>
        ))}
      </List>
  );
}
