import { styled } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function BreakingBadCharPage() {
  const [character, setCharacter] = useState([]);
  console.log(character);
  const params = useParams();
  const NameTitle = styled("h1")` 
  font-size: 1.5rem;
  color: red;
  margin-left: 650px;
  `; 
 
  useEffect(() => { 
    fetch(
      `https://www.breakingbadapi.com/api/characters/${params.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
      });
  }, [params.id]);

  return (
    <div className="App">
      <NameTitle>{character[0]?.name}</NameTitle>
      <img style ={{width:300}} className="singlePhoto" src={character[0]?.img} alt="" />
      <h3 className="singlePhotoTitle">Nickname: {character[0]?.nickname}</h3>
      <h3 className="singlePhotoTitle">Status: {character[0]?.status}</h3>
      <h3 className="singlePhotoTitle">Occupation: {character[0]?.occupation}</h3>
      <h3 className="singlePhotoTitle">Actor: {character[0]?.portrayed}</h3>
    </div>
  );
}