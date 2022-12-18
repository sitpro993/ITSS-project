import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl } from '@mui/material';
import { createOccupation } from '../../../apis/occupation';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function FormDialog({open, handleClose}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      video_link: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await createOccupation({
      title: data.title,
      description: data.description,
      video_link: data.video_link
    });

    if (response && response.msg) {
      window.location.reload()
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
    <div>
       
      <Dialog open={open} onClose={handleClose} component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Create new occupation information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Help student know more about occupation in all industry
          </DialogContentText>
         
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            required
            variant="standard"
            {...register('title')}
            sx = {{mb: 3}}
          />

          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            required
            type="text"
            fullWidth
            {...register('description')}
          />

          <TextField
            margin="dense"
            id="link"
            label="Video Link"
            type="text"
            fullWidth
            required
            variant="standard"
            {...register('video_link')}

            sx = {{mb: 3}}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}