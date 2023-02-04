import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { ROUTE } from '../../../constant/route';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';

export const CompanyItem = ({ company, loading }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${ROUTE.COMPANY}/${company?._id}`);
  };

  return !loading ? (
    <Card sx={{ maxWidth: 345, height: '100%' }} key={company?.id}>
      <Stack height={'100%'} justifyContent={'space-between'}>
        <CardMedia
          component="img"
          image={company?.logo}
          alt="Company logo"
          height="200"
          sx={{ objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {company?.full_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {company?.field || 'No field'}
          </Typography>
          {/* <Typography variant="caption" color="text.secondary">
            {`${company?.address|| 'No address'} `}
            {company?.email || 'No email'}
          </Typography> */}
          <Box>
            {company?.positions?.slice(0, 2)?.map((position) => (
              <Chip
                label={position?.name}
                color="primary"
                sx={{ mt: 1, mr: 1 }}
              />
            ))}
            {company?.positions?.length > 2 && (
              <Chip
                label={`+${company?.positions?.length - 2} vị trí`}
                sx={{ mt: 1, mr: 1 }}
              />
            )}
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small" style={{fontSize: '15px'}}>
            {/* Share */}
            Chia sẻ
          </Button>
          <Button size="small" style={{fontSize: '15px'}} onClick={handleClick}>
            {/* Learn More */}
            Chi tiết
          </Button>
        </CardActions>
      </Stack>
    </Card>
  ) : (
    <Skeleton
      variant="rectangular"
      animation="wave"
      width="15vw"
      height="25vh"
    />
  );
};
