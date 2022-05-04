import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CinemaPage } from "./CinemaPage";
import { Pagination } from '@mui/material';
import { scrollToTop } from "../utils/scrollToTop";

export function CinemaPages() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(4);
  

  const fetchMovies = (page = 1, search = "") => {
    fetch(
      `https://www.breakingbadapi.com/api/characters/?name=${search}&limit=20&offset=${(page - 1) * 20}`
    )
      .then((res) => res.json())
      .then((res) => {
        scrollToTop()
        setMovies(res);
      });
  };

  function handelSubmit(e) { 
    e.preventDefault();
    fetchMovies(1, search);
    if (movies.length <= 20 && search !== "") {
      setTotalPages(1);
    }
    else {
      setTotalPages(4)
    };
  }

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <div style={{
      padding: "20px",
    }}>
      <form onSubmit={ handelSubmit}
        style={{
        display: "flex",
        justifyContent: "flex-end",
      }}>
        <TextField onChange={(e) => {
          setSearch(e.target.value);
        }}
          id="outlined-search" label="Search field" type="search" value={search}/>
        <Button style={{
          backgroundColor: "blue",
          color: "white",
        }}
          type="submit"
          variant="outlined"
        >
          Поиск по имени
        </Button>
      </form>
      <h1
        style={{
          margin: 0,
          marginBottom: 40,
          fontSize:80,
          fontWeight: 800,
          textAlign: "center",
          color: "rgb(32, 35, 41)",
        }}
      >
        The Breaking Bad
      </h1>
      <Grid  container spacing={2}>
        {!movies.length ? 
          <h1 style={
            {               
              fontSize: "4rem",
              color: "rgb(32, 35, 41)",
              margin: "0 auto",
            }
          }>Нет данных</h1> :
          movies.map((movie) => (
            <Grid item lg={12 / 5} key={movie.char_id}>
              <CinemaPage movie={movie} />
            </Grid>
          ))}
      </Grid>
      <div style={{ display: "flex", margin: "20px auto" }}>
        {!movies.length ? 
          "" : 
          <Pagination
            style={{ margin: "0 auto" }}
            count={totalPages}
            page={page}
            onChange={(event, page) => {
              setPage(page)
            }}
            variant="outlined"
            shape="rounded"
            color="secondary"
          />
        }
      </div>
    </div>
  );
}
