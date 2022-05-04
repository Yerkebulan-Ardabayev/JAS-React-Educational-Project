import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { CinemaPage } from "./CinemaPage";
import { Pagination } from '@mui/material';
import { scrollToTop } from "../utils/scrollToTop";

export function CinemaPages() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const fetchMovies = (page = 1) => {
    fetch(
      `https://www.breakingbadapi.com/api/characters?limit=20&offset=${(page - 1) * 20}`
    )
      .then((res) => res.json())
      .then((res) => {
        scrollToTop()
        setMovies(res);
      });
  };

  useEffect(() => {

    fetchMovies(page);
  }, [page]);

  return (
    <div>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item lg={12 / 5}>
            <CinemaPage movie={movie} />

          </Grid>
        ))}
      </Grid>

      <div style={{ display: "flex", margin: "20px auto" }}>
        <Pagination
          style={{ margin: "0 auto" }}
          count={4}
          page={page}
          onChange={(event, page) => {
          setPage(page)
          }}
          variant="outlined"
          shape="rounded"
          color="secondary"
        />
      </div>
    </div>
  );
}
