import { useState } from "react";
import { fibonacci } from "../components/fibonacci";
import TextField from "@mui/material/TextField";

export function About() {
  const [number, setNumber] = useState(null);

  function handleChange(e) {
    setNumber(+e.target.value);
  }

  return (
    <div>
      <div>
        <TextField
          id="standard-basic"
          label="Number"
          variant="standard"
          onChange={handleChange}
          type="number"
        />
      </div>
      <div>{number < 1 ? "Type number higher than 0" : fibonacci(number)}</div>
    </div>
  );
}
