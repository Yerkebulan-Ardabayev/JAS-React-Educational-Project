import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";

const dollarPrice = 427;

export const ProductItem = ({ product, onAddToBasket }) => {
  
  return (
    <Card
      sx={{
        borderRadius: "8px",
        marginTop: "28px",
        marginBottom: "26px",
        maxWidth: "100%",
        border: "1px solid #acacac",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.title}
          style={{ objectFit: "contain", marginTop: "10px" }}
        />
        <CardContent>
          <Typography gutterBottom component="div">
            {product.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {(product.price * dollarPrice).toFixed(2)}тг
          
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ marginTop: "auto", marginBottom: "10px"}}>
        <Button color="primary" onClick={onAddToBasket}>
          To Basket
        </Button>
      </CardActions>
    </Card>
  );
};
