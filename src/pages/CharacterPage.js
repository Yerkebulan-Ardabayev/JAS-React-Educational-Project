import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export function CharacterPage() {
  const params = useParams();

  const [character, setCharacter] = useState([]);

  function getCharacterData() {
    fetch(`https://rickandmortyapi.com/api/character/${params.id}`)
      .then((res) => res.json())
      .then((data) => setCharacter(data));
  }

  useEffect(() => {
    getCharacterData();
  }, [params.id]);

  console.log(character);

  return (
    <Container style={{ maxWidth: 1280 }}>
      <h1
        style={{
          margin: 0,
          marginBottom: 20,
          fontSize: 100,
          fontWeight: 800,
          textAlign: "center",
          color: "rgb(32, 35, 41)",
        }}
      >
        Character Page
      </h1>
      <Card sx={{ display: "flex", boxShadow: 3 }}>
        <CardMedia
          component="img"
          style={{ maxWidth: 40 + "%" }}
          image={character.image}
          alt="character image"
        />
        <CardContent style={{ flexGrow: 1, textAlign: "center" }}>
          <Typography gutterBottom variant="h2" component="div">
            {`${character.name} (${character.gender})`}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            <span style={{ fontSize: 40 }} className="character_status">
              <span
                className="status_icon"
                style={{
                  backgroundColor:
                    character.status === "Alive"
                      ? "rgb(85, 204, 68)"
                      : character.status === "Dead"
                      ? "rgb(214, 61, 46)"
                      : "rgb(158, 158, 158)",
                  width: 20,
                  height: 20,
                }}
              ></span>
              {character.status} - {character.species}
            </span>
          </Typography>
          <Typography
            variant="h4"
            component="div"
            color="text.primary"
            sx={{ marginTop: 5, marginBottom: 10 }}
          >
            <span style={{ color: "rgba(0, 0, 0, 0.6)" }}>Location:</span>{" "}
            {character.location ? character.location.name : ""}
          </Typography>
          <Typography variant="h4" component="div" color="text.primary">
            <span style={{ textTransform: "uppercase" }}>
              First seen in episode: #
            </span>
            {character.episode ? character.episode[0].match(/\d+/) : ""}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
