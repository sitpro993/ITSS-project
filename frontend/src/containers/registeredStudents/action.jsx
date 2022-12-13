import { Box, IconButton, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Delete, Edit, Preview } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../constant/route';

export default function Action() {
  const navigate = useNavigate()
  return (
    <Box>
      <Tooltip title="View cv">
        <IconButton>
          <VisibilityIcon onClick={navigate(`/student-requests/1`)}/>
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
