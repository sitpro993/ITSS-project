import { Container, Typography } from '@mui/material'
import React from 'react'
import NavBar from '../../components/NavBar'
import OccupationCard from './occupationCard'

function Occupation() {
    const occupations = [
        {
            title: "Software Engineer",
            description: "A computer programmer, sometimes referred to as a software developer, a software engineer, a programmer or a coder, is a person who creates computer programs — often for larger computer software.",
            video_link: 'https://www.youtube.com/watch?v=leOX1ehXHNM',
            collapse_content: 'A programmer creates computer software or applications by providing a specific programming language to the computer. Most programmers have extensive computing and coding experience in many varieties of programming languages and platforms'
        },
        {
            title: "Software Engineer",
            description: "A computer programmer, sometimes referred to as a software developer, a software engineer, a programmer or a coder, is a person who creates computer programs — often for larger computer software.",
            video_link: 'https://www.youtube.com/watch?v=leOX1ehXHNM',
            collapse_content: 'A programmer creates computer software or applications by providing a specific programming language to the computer. Most programmers have extensive computing and coding experience in many varieties of programming languages and platforms' 
        }
    ]
  return (
    <>
        <NavBar/>
        <Container>
            <Typography variant = "h2" gutterBottom sx ={{mt: 3}}> Occupation List </Typography>
            {
               occupations.map((item) => 
                (
                    <OccupationCard 
                        title = {item.title}
                        description = {item.description}
                        video_link = {item.video_link}
                        collapse_content = {item.collapse_content} />
                )
               ) 
            }
            
        </Container>
        
        
    </>
  )
}

export default Occupation