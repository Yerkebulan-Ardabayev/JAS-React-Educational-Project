import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { CinemaPage } from "./CinemaPage";

export function CinemaPages() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      "https://www.breakingbadapi.com/api/characters"
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  }, []);

  console.log(movies);

  return (
    <div>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item lg={12 / 5}>
            <CinemaPage movie={movie} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
