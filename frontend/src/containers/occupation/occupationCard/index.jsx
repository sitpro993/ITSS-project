import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  // transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function OccupationCard({
  title,
  description,
  video_link,
  collapse_content,
  image,
  skills,
  salary
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 1000, mb: 2 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={<>
        <p><b>Skill: </b>{skills}</p>
        <p><b>Average salary: </b>{salary}</p>
        </>}
        // subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <a href={video_link}>Link to introduction </a>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {/* <ExpandMoreIcon /> */}
          <Button variant="contained" color="success">
            Learn more
          </Button>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Card sx={{ display: 'flex', justifyContent: 'space-between', padding: '2%', 'text-align': 'justify'}}>
          <CardContent>
            <Typography paragraph>{collapse_content}</Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width:'40%'}}
            image={image}
            alt="Live from space album cover"
          />
        </Card>
      </Collapse>
    </Card>
  );
}
