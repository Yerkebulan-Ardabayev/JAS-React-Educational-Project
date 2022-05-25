import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import {
  decrement,
  increment,
  incrementByAmount
} from "../store/slice/counter";

export const CounterComponent = () => {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={() => dispatch(incrementByAmount(-5))}>-5</Button>
      <Button onClick={() => dispatch(decrement())}>-</Button>
      {value}
      <Button onClick={() => dispatch(increment())}>+</Button>
      <Button onClick={() => dispatch(incrementByAmount(5))}>+5</Button>
    </div>
  );
};