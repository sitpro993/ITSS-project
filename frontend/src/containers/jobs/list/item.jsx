import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ROUTE } from '../../../constant/route';

export const JobItem = ({ job }) => {
  const handleClick = () => {
    window.location.href = `${ROUTE.JOBS}/${job.id}`;
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="/public/logo192.png"
        alt="company logo"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {job.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" onClick={handleClick}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};
