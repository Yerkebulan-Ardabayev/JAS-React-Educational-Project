import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function RickAndMorty() {
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  let [page, setPage] = useState(1);
  let [episodePage, setEpisodePage] = useState(1);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllCharacters();
  }, [page]);

  useEffect(() => {
    getAllEpisodes();
  }, [episodePage]);

  function getAllEpisodes() {
    fetch(`https://RickAndMortyapi.com/api/episode/?page=${episodePage}`)
      .then((res) => res.json())
      .then((data) => {
        setEpisodes((prev) => [...prev, ...data.results]);
        if (episodePage < data.info.pages) {
          setEpisodePage(episodePage + 1);
        }
      });
  }

  function getAllCharacters({ pageInfo = page, sortBy = sort } = {}) {
    fetch(
      `https://RickAndMortyapi.com/api/character/?page=${pageInfo}&name=${query}&status=${sortBy}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      })
      .catch((error) => {
        console.log("There is nothing here");
      });
  }

  function sortCharacterByStatus(e) {
    setSort(e.target.value);
    getAllCharacters({ sortBy: e.target.value });
    setPage(1);
  }

  return (
    <Container style={{ padding: 40 }} maxWidth="xl">
      <Container style={{ maxWidth: 1280 }}>
        <div>
          <h1
            style={{
              margin: 0,
              marginBottom: 40,
              fontSize: 100,
              fontWeight: 800,
              textAlign: "center",
              color: "rgb(32, 35, 41)",
            }}
          >
            The Rick and Morty
          </h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1>Characters</h1>
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "baseline",
              }}
              className="search_box"
            >
              {
                <FormControl
                  variant="standard"
                  fullWidth
                  style={{ marginRight: 20, minWidth: 90 }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Sort by status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Sort by status"
                    onChange={sortCharacterByStatus}
                  >
                    <MenuItem value={"alive"}>Alive</MenuItem>
                    <MenuItem value={"dead"}>Dead</MenuItem>
                    <MenuItem value={"unknown"}>unknown</MenuItem>
                  </Select>
                </FormControl>
              }
              <TextField
                id="standard-basic"
                label="Search"
                variant="standard"
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button onClick={getAllCharacters} className="search_btn">
                Search
              </Button>
            </div>
          </div>
          <ul className="characters_list">
            {!characters ? (
              <h1 style={{ fontSize: 80 }}>There is nothing here</h1>
            ) : (
              characters.map((character, index) => (
                <Card
                  sx={{
                    display: "flex",
                    maxWidth: 600,
                    height: 220,
                    flexGrow: 1,
                    boxShadow: 3,
                  }}
                  key={index}
                  className="characters_card"
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 230 }}
                    image={character.image}
                    alt="Live from space album cover"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    <CardContent
                      className="character_card_content"
                      sx={{
                        flex: "1 0 auto",
                        backgroundColor: "rgb(60, 62, 68)",
                      }}
                    >
                      <Typography component="div" variant="h5">
                        <h2
                          onClick={() =>
                            navigate("/RickAndMorty/" + character.id)
                          }
                          className="character_title"
                        >
                          {character.name}
                        </h2>
                      </Typography>
                      <Typography
                        fontFamily="Segoe UI"
                        color="white"
                        component="div"
                      >
                        <span className="character_status">
                          <span
                            className="status_icon"
                            style={{
                              backgroundColor:
                                character.status === "Alive"
                                  ? "rgb(85, 204, 68)"
                                  : character.status === "Dead"
                                    ? "rgb(214, 61, 46)"
                                    : "rgb(158, 158, 158)",
                            }}
                          ></span>
                          {character.status} - {character.species}
                        </span>
                        <Typography
                          fontFamily="Segoe UI"
                          fontWeight={500}
                          color="rgb(158, 158, 158)"
                          component="div"
                          marginTop={2}
                        >
                          <span>Last known location:</span>
                          <h3 className="character_location">
                            {character.location.name}
                          </h3>
                          <div style={{ marginTop: 16 }}>
                            <span>First seen in:</span>
                            <h3 className="character_location">
                              {/* episode - {character.episode[0].match(/\d+/)} */}
                              {episodes.map((ep, index) => {
                                if (ep.url === character.episode[0])
                                  return ep.name;
                              })}
                            </h3>
                          </div>
                        </Typography>
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              ))
            )}
          </ul>
        </div>
        {!characters ? (
          ""
        ) : (
          <Pagination
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            count={totalPages}
            page={page}
            shape="rounded"
            onChange={(e, page) => setPage(page)}
          />
        )}
      </Container>
    </Container>
  );
}
