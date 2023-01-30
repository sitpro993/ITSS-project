import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createOccupation } from "../../../apis/occupation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { imageUpload } from "../../../utils/uploadImage";
import TextEditor from "../../../components/TextEditor";

export default function FormDialog({ open, handleClose }) {
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      video_link: "",
      skills: "",
      salary: "",
    },
  });

  const imgWatch = watch("image");
  const [value, setValue] = React.useState();

  const onSubmit = async (data) => {
    const img = await imageUpload(data.image[0]);
    if (img.url && value) {
      const response = await createOccupation({
        title: data.title,
        description: data.description,
        video_link: data.video_link,
        image: img.url,
        skills: data.skills,
        salary: data.salary,
        post: value,
      });

      if (response && response.msg) {
        window.location.reload();
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
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle>Create new occupation information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Help student know more about occupation in all industry
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            label="Tiêu đề"
            type="text"
            fullWidth
            required
            {...register("title", { required: "Tiêu đề không được để trống" })}
            sx={{ mb: 3 }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Mức lương"
            type="text"
            fullWidth
            required
            {...register("salary", { required: "Tiêu đề không được để trống" })}
            sx={{ mb: 3 }}
          />

          <TextField
            id="outlined-multiline-static"
            label="Kĩ năng cần có"
            multiline
            rows={4}
            required
            type="text"
            fullWidth
            {...register("skills", { required: "Tiêu đề không được để trống" })}
            sx={{ mb: 3 }}
          />
          {imgWatch && (
            <img
              src={URL.createObjectURL(imgWatch[0])}
              width={300}
              height={300}
              alt=""
              style={{ display: "block" }}
            />
          )}
          <Button variant="contained" component="label" sx={{ mb: 3, mt: 3 }}>
            Tải ảnh lên
            <input
              hidden
              accept="image/*"
              type="file"
              {...register("image", {
                required: "Tiêu đề không được để trống",
              })}
            />
          </Button>
          <TextField
            id="outlined-multiline-static"
            label="Mô tả"
            multiline
            rows={4}
            required
            type="text"
            fullWidth
            {...register("description", {
              required: "Tiêu đề không được để trống",
            })}
            sx={{ mb: 3 }}
          />

          <TextField
            margin="dense"
            id="link"
            label="Đường link video"
            type="text"
            fullWidth
            required
            {...register("video_link", {
              required: "Link video không được để trống",
            })}
            sx={{ mb: 3 }}
          />
          <p>Bài viết mô tả</p>
          <TextEditor value={value} setValue={setValue} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Apply </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
