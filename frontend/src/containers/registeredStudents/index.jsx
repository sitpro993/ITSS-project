import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "./mockData";
import Action from "./action";
import { useEffect, useState } from "react";
import { apiGetListJobByCompany } from "../../apis/job";
import { useSelector } from "react-redux";

export default function RegisteredStudentList() {
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
              age: 15,
              phone: "(665)121-5454",
              address: "0912 Won Street, Alabama, SY 10001",
              apply_internship: item.position.name,
            };
          });
          setData(temp);
        }
      }
    };
    getListJob();
  }, [userInfo]);

  console.log(data);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "apply_internship",
      headerName: "Apply internship",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "View CV",
      type: "actions",
      flex: 1,
      renderCell: () => <Action />,
    },
  ];

  return (
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
  );
}
