import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { apiAcceptJob, apiDenyJob } from "../../apis/job";

export default function FormAccept({ open, setOpen, student, data, setData }) {
  console.log(student)
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
      {/* <DialogTitle>Applied Student Info</DialogTitle> */}
      <DialogTitle>Thông tin sinh viên ứng tuyển</DialogTitle>
      <DialogContent>
         {/* <DialogContentText>Here is student information applied your company</DialogContentText> */}
         <DialogContentText>Đây là thông tin sinh viên apply công ty bạn</DialogContentText>
        <Stack spacing = {2}>
        <TextField
          id="filled-read-only-input"
          // label="Name"
          label="Tên"
          defaultValue={student.name}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
          fullWidth
        />
        <TextField
          id="filled-read-only-input"
          // label="Age"
          label="Tuổi"
          defaultValue={student.age}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
          fullWidth

        />
        <TextField
          id="filled-read-only-input"
          label="Email"
          defaultValue={student.email}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
          fullWidth

        />
        <TextField
          id="filled-read-only-input"
          // label="Address"
          label="Địa chỉ"
          defaultValue={student.address}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
          fullWidth

        />
        <TextField
          id="filled-read-only-input"
          label="CPA"
          defaultValue={student.cpa}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
          fullWidth
        />
        <TextField
          id="filled-read-only-input"
          // label="Available Time"
          label="Thời gian có thể làm việc"
          defaultValue={student.availableTime}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
          fullWidth
        />
        <TextField
          id="filled-read-only-input"
          // label="Strength"
          label="Điểm mạnh"
          defaultValue={student.strength}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
          fullWidth
        />
        <TextField
          id="filled-read-only-input"
          // label="Weakness"
          label="Điểm yếu"
          defaultValue={student.weakness}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
          fullWidth
        />
        <TextField
          id="filled-read-only-input"
          // label="Achievement"
          label="Thành tích"
          defaultValue={student.achievement}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
          fullWidth
        />
        </Stack>

      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleAccepted}>Accept</Button>
        <Button color="error" onClick={handleDeny}>
          Deny
        </Button> */}
        <Button onClick={handleAccepted}>Đồng Ý</Button>
        <Button color="error" onClick={handleDeny}>
          Từ Chối
        </Button>
      </DialogActions>
    </Dialog>
  );
}
