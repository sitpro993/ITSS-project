import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { ROUTE } from '../../../constant/route';

export const CompanyItem = ({ company, loading }) => {
  const handleClick = () => {
    window.location.href = `${ROUTE.COMPANYS}/${company.id}`;
  };

  return !loading ? (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
       component="img"
       image={company.logo}
       alt="Company logo"
       height="140"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {company.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {company.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" onClick={handleClick}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  ) : (
    <Skeleton variant="rectangular" animation="wave" width='15vw' height='25vh' />
  );
};