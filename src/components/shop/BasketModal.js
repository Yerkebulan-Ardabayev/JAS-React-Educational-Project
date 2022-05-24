import '../shop/ShopStyle.css';
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled
} from "@mui/material";
import { Box, Modal, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from '@mui/icons-material/Delete';


const dollarPrice = 427;

const StyledBox = styled(Box)`
  width: 400px;
  background: violet;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #acacac;
  box-shadow: 24px;
  padding: 8px;
  border-radius: 8px;
`;

export const BasketModal = ({ basket, onDeleteItem, onBasketItemCountChange, ...props }) => {
     
 
  function countAllPrices(items) {
    return items.reduce((acc, item) => acc + item.price * item.count * dollarPrice, 0)
      .toFixed(2);
  }

  return (
    <Modal {...props}>
      <StyledBox>
        <Typography
          sx={{ textAlign: "center" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Your Basket
        </Typography>

        <List
          sx={{ width: "100%", maxWidth: 360, backgrouncolor: "background.paper" }}
        >
          {basket.map((item, index) => (
            <>
              {index !== 0 && (
                <Divider
                  key={"divider_" + item.id}
                  variant="inset"
                  component="li"
                />
              )}
              <ListItem key={item.id} alignItems="flex-start">
                <ListItemAvatar sx={{ mr: 1 }}>
                  <img
                    alt=""
                    src={item.image}
                    style={{
                      width: "100px",
                      height: "80px",
                      objectFit: "contain"
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${item.title} x${item.count}`}
                  secondary={
                    <Typography
                      sx={{ display: "block", with: "150px" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.price * item.count * dollarPrice} тeнге.
                      {item.count > 1 && <>({item.price * dollarPrice} тенге за штуку)</>}
                    </Typography>
                  }
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Button onClick={() => onBasketItemCountChange(item, 1)}>
                    <KeyboardArrowUpIcon />
                  </Button>
                  {item.count}
                  <Button onClick={() => onBasketItemCountChange(item, -1)}>
                    
                    <KeyboardArrowDownIcon />
                  </Button>
                </div>
              </ListItem>
              <div className="TotalPrice">
                <Typography>
                  Total price: <br />
                  {countAllPrices(basket)} тенге.
                </Typography>
              </div>
              <div className="DeleteItems">
                <Button
                  onClick={() => onDeleteItem(item.id)}
                  sx={{
                    display: "flex",
                    color: "red",
                    justifyContent: "flex-end",
                    width: "1px",
                    height: "1px",
                  }}>                
                  <svg data-test id="DeleteIcon">
                    <DeleteIcon/>
                  </svg>
                </Button>
              </div>
            </>
          ))}
        </List>
      </StyledBox>
    </Modal>
  );
};
