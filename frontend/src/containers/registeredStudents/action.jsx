import { Box, IconButton, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Delete, Edit, Preview } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";

export default function Action() {
  return (
    <Box>
      <Tooltip title="View cv">
        <IconButton>
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
