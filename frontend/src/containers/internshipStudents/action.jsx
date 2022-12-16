import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export default function Action() {
  const navigate = useNavigate();
  return (
    <Box>
      <Tooltip title="View CV">
        <IconButton>
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
