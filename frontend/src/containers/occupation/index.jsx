import {
  CircularProgress,
  Container,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getOccupation } from "../../apis/occupation";
import OccupationCard from "./occupationCard";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { SearchBar } from "./searchBar";
import "./index.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import ItemCard from "./itemCard";

function Occupation() {
  /* const [loading, setLoading] = useState(true);
  const [occupations, setOccupations] = useState();
  const accessToken = localStorage.getItem("");
  const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

  const [searchQuery, setSearchQuery] = useState("");
  // const dataFiltered = filterData(searchQuery, occupations);
  useEffect(() => {
    const getApi = async () => {
      const response = await getOccupation(accessToken);

      setOccupations(response.data);
      setLoading(false);
    };
    getApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  if (loading) return <CircularProgress />;
  else
    return (
      <>
        <Container sx = {{m: "auto", p: 2}}>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Typography variant="h2" gutterBottom sx={{ mt: 3 , color: '#7ABACC'}}>
            {" "}
            Occupation List{" "}
          </Typography>
          {occupations.slice((page -1)*5, (page -1)*5 + 4).map((item) => (
            <OccupationCard
              title={item.title}
              description={item.description.substring(0, 100) + "..."}
              video_link={item.video_link}
              collapse_content={item.description}
              image={item.image}
              skills={item.skills}
              salary={item.salary}
            />
          ))}
          <Pagination count={10} page={page} 
                    onChange={handleChange} />
        </Container>
      </>
    );
  
  */

  const [loading, setLoading] = useState(true);
  const [occupations, setOccupations] = useState();
  const accessToken = localStorage.getItem("");
  const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

  const [searchQuery, setSearchQuery] = useState("");
  // const dataFiltered = filterData(searchQuery, occupations);
  useEffect(() => {
    const getApi = async () => {
      const response = await getOccupation(accessToken);

      setOccupations(response.data);
      setLoading(false);
    };
    getApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  

  if (loading) return <CircularProgress />;
  else

  return (
    <div style={{ marginTop: "30px" }}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="my-element decorative-line">
        <h2 className="title">Công việc được tìm kiếm nhiều nhất</h2>
      </div>
      <Carousel responsive={responsive} containerClass="carousel-container">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </Carousel>
      <div className="my-element decorative-line">
        <h2 className="title">Các công việc được đăng ký nhiều nhất</h2>
      </div>
      <Carousel responsive={responsive} containerClass="carousel-container">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </Carousel>
      {/* <h2>Các công việc được đăng ký nhiều nhất</h2>
      <Carousel responsive={responsive} containerClass="carousel-container">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </Carousel>
      <OccupationCard /> */}

    </div>
  );
}

export default Occupation;
