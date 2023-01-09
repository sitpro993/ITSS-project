import { CircularProgress, Container, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getOccupation } from "../../apis/occupation";
import OccupationCard from "./occupationCard";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { SearchBar } from "./searchBar";
function Occupation() {
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
            />
          ))}
          <Pagination count={10} page={page} 
                    onChange={handleChange} />
        </Container>
      </>
    );
}

export default Occupation;
