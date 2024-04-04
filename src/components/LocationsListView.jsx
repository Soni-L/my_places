import { List, ListItem, IconButton, Typography } from "@mui/material";
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
    <List sx={{ padding: 0 }}>
      <Typography variant="h6" sx={{ padding: "5px", color: "gray" }}>
        Saved Locations
      </Typography>
      {items.map((item) => (
        <ListItem
          key={item.id}
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            marginBottom: "4px",
            width: "100%",
            "&:hover": {
              backgroundColor: "lightgray",
            },
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
          <Typography variant="body" sx={{ color: "black" }}>
            {item.name}
          </Typography>
          <IconButton
            size="xs"
            edge="end"
            aria-label="delete"
            onClick={() => handleDelete(item)}
            style={{ marginLeft: "auto" }}
          >
            <DeleteIcon style={{ color: "red", height: "20px" }} />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}
