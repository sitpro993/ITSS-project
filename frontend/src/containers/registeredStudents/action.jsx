import { Box, IconButton, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Delete, Edit, Preview } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Action() {
  return (
    <Box>
      <Tooltip title="View cv">
        <IconButton>
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Accept">
        <IconButton sx={{color: "green"}} >
          <CheckCircleIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Cancel">
        <IconButton
        >
          <CancelIcon sx={{color: "red"}} />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
