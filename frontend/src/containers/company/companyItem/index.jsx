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
import { Stack } from '@mui/system';

export const CompanyItem = ({ company, loading }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${ROUTE.COMPANY}/${company?.id}`);
  };

  return !loading ? (
    <Card sx={{ maxWidth: 345, height: '100%' }} key={company?.id}>
      <Stack height={'100%'} justifyContent={'space-between'}>
        <CardMedia
          component="img"
          image={company?.logo}
          alt="Company logo"
          height="140"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {company?.full_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {company?.description || 'No description'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {`${company?.address|| 'No address'}\n`}
            {company?.email || 'No email'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small" onClick={handleClick}>
            Learn More
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
