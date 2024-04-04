import * as React from "react";
import Button from "@mui/material/Button";
import { Divider, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddLocationDialog({ dialogOptions, handleClose }) {
  console.log(dialogOptions);
  return (
    <React.Fragment>
      <Dialog
        open={dialogOptions.open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add New Location</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Location Name"
            fullWidth
            variant="standard"
          />
          <Typography variant="body2">Lat: {dialogOptions.lat}</Typography>
          <Typography variant="body2">Lng: {dialogOptions.lng}</Typography>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Add Location</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
