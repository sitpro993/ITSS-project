import { CircularProgress, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getOccupation } from "../../apis/occupation";
import OccupationCard from "./occupationCard";

function Occupation() {
  const [loading, setLoading] = useState(true);
  const [occupations, setOccupations] = useState();
  const accessToken = localStorage.getItem("");
  useEffect(() => {
    const getApi = async () => {
      const response = await getOccupation(accessToken);

      setOccupations(response.data);
      setLoading(false);
    };
    getApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const occupations = [
  //     {
  //         title: "Software Engineer",
  //         description: "A computer programmer, sometimes referred to as a software developer, a software engineer, a programmer or a coder, is a person who creates computer programs — often for larger computer software.",
  //         video_link: 'https://www.youtube.com/watch?v=leOX1ehXHNM',
  //         collapse_content: 'A programmer creates computer software or applications by providing a specific programming language to the computer. Most programmers have extensive computing and coding experience in many varieties of programming languages and platforms'
  //     },
  //     {
  //         title: "Software Engineer",
  //         description: "A computer programmer, sometimes referred to as a software developer, a software engineer, a programmer or a coder, is a person who creates computer programs — often for larger computer software.",
  //         video_link: 'https://www.youtube.com/watch?v=leOX1ehXHNM',
  //         collapse_content: 'A programmer creates computer software or applications by providing a specific programming language to the computer. Most programmers have extensive computing and coding experience in many varieties of programming languages and platforms'
  //     }
  // ]
  if (loading) return <CircularProgress />;
  else
    return (
      <>
        <Container>
          <Typography variant="h2" gutterBottom sx={{ mt: 3 }}>
            {" "}
            Occupation List{" "}
          </Typography>
          {occupations.map((item) => (
            <OccupationCard
              title={item.title}
              description={item.description.substring(0, 100) + "..."}
              video_link={item.video_link}
              collapse_content={item.description}
            />
          ))}
        </Container>
      </>
    );
}

export default Occupation;
