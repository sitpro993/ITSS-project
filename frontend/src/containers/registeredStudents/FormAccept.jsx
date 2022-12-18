import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { apiAcceptJob, apiDenyJob } from "../../apis/job";

export default function FormAccept({ open, setOpen, student, data, setData }) {
  const handleAccepted = async () => {
    const response = await apiAcceptJob(student._id);
    if (response && response.msg) {
      console.log(response.msg);
      const newData = data.filter((item) => item._id !== student._id);
      setData(newData);
      setOpen(false);
      toast.success(response.msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleDeny = async () => {
    const response = await apiDenyJob(student._id);
    if (response && response.msg) {
      const newData = data.filter((item) => item._id !== student._id);
      setData(newData);
      setOpen(false);
      toast.success(response.msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccepted}>Accept</Button>
        <Button onClick={handleDeny}>Deny</Button>
      </DialogActions>
    </Dialog>
  );
}
