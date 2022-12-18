import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "./mockData";
import Action from "./action";
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
