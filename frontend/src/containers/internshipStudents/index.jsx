import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiGetAcceptedByCompany } from "../../apis/job";

export default function IntershipStudentList() {
  const [data, setData] = useState([]);
  const userInfo = useSelector((s) => s.auth.user);

  useEffect(() => {
    const getListJob = async () => {
      if (userInfo) {
        const response = await apiGetAcceptedByCompany(userInfo._id);
        if (response && response.data) {
          const temp = response.data.map((item, index) => {
            return {
              id: index,
              name: `${item.student.lastName} ${item.student.firstName}`,
              email: item.student.userId.email,
              age: item.student.age,
              phone: item.student.phone,
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
      headerName: "Vị trí thực tập",
      flex: 1,
    },

    // {
    //   field: "actions",
    //   type: "actions",
    //   flex: 1,
    //   headerName: "Actions",
    //   renderCell: () => (<Action />)
    // },
  ];

  return (
    <Box m="20px">
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
  );
}
