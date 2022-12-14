import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { apiGetListJobByCompany } from "../../apis/job";
import { useSelector } from "react-redux";
import FormAccept from "./FormAccept";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function RegisteredStudentList() {
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState({});
  const [data, setData] = useState([]);
  const userInfo = useSelector((s) => s.auth.user);

  useEffect(() => {
    const getListJob = async () => {
      if (userInfo) {
        const response = await apiGetListJobByCompany(userInfo._id);
        if (response && response.data) {
          const temp = response.data.map((item, index) => {
            return {
              id: index,
              name: `${item.student.lastName} ${item.student.firstName}`,
              email: item.student.userId.email,
              age: item.student.age,
              cpa: item.student.CPA,
              phone: item.student.phone,
              achievement: item.student.achievement,
              strength: item.student.strength,
              availableTime: item.student.availableTime,
              weakness: item.student.weakness,
              address: item.student.address,
              apply_internship: item.position.name,
              _id: item._id,
            };
          });
          setData(temp);
        }
      }
    };
    getListJob();
  }, [userInfo]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Họ và tên",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Tuổi",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "SĐT",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      flex: 1,
    },
    {
      field: "apply_internship",
      headerName: "Vị trí đăng ký",
      flex: 1,
    },
    {
      field: "_id",
      headerName: "Xem CV",
      type: "actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View cv">
            <IconButton>
              <VisibilityIcon
                onClick={() => {
                  setStudent(data[params.row.id]);
                  setOpen(true);
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Box m="40px 0 0 0" height="75vh">
          {data && (
            <DataGrid
              rows={data}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          )}
        </Box>
      </Box>

      <FormAccept
        open={open}
        setOpen={setOpen}
        student={student}
        data={data}
        setData={setData}
      />
    </>
  );
}
