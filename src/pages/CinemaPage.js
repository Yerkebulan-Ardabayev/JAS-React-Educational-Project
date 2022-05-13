import { useNavigate } from "react-router-dom";

export function CinemaPage({ movie }) {
  const navigate = useNavigate()
  return (
    <div className="movie_card" onClick={() => navigate('/cinema/' + movie.char_id)}>
      <img
        className="movie_card__poster"
        src= {movie.img}
        alt=""
      />
      <h4 className="movie_card__title">{movie.name}</h4>
    </div>
  );
}