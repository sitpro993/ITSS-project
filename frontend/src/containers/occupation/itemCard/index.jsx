import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function ItemCard({
  title,
  description,
  video_link,
  collapse_content,
  image,
  skills,
  salary,
}) {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{ maxWidth: 350, height: '100%' }}>
      <CardMedia
        component="img"
        height="150"
        image="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/8a/f7f459f9674408947edb8e594a5da3/1200x600_PgM.png?auto=format%2Ccompress%2C%20enhance&dpr=2&w=600&h=216&fit=fill&q=50"
        alt="Paella dish"
      />
      <CardContent>
        <h2 className="whitespace-nowrap">Title {title}</h2>
        <Typography variant="body2" color="text.secondary">
          <div>
            <b>Skill: </b>
            {skills}
          </div>
          <div>
            <b>Average salary: </b>
            {salary}
          </div>
          <div>
            <div>
              <b>Description: </b>
              <span>
                {description?.length < 30 ? (
                  description
                ) : (
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>{description}</Typography>
                    </CardContent>
                  </Collapse>
                )}
              </span>
            </div>
          </div>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {description?.length > 30 && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{collapse_content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
