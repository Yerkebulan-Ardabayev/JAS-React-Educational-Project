import { Button, CircularProgress, IconButton, styled } from "@mui/material";
import { Container, Grid } from "@mui/material";
import { useCallback, useEffect } from "react";
import { ProductItem } from "./ProductItem";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { BasketModal } from "./BasketModal";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, setBasketOpened } from "../store/slice/shop";
import { loadProducts } from "../store/actions/loadProducts";

const BasketButton = styled(IconButton)`
  position: fixed;
  right: 10px;
  top: 10px;
  border: 1px solid currentColor;
`;
export const ShopModule = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.shop);

  const load = useCallback(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  useEffect(() => {
    load();
  }, [load]);

  const handleAddToBasket = useCallback(
    (product) => {
      dispatch(addToBasket(product));
    },
    [dispatch]
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <div style={{ border: "1px solid red", color: "red" }}>
        {error}
        <Button onClick={load}>Reload</Button>
      </div>
    );
  }

  return (
    <>
      <BasketButton
        color="primary"
        size="large"
        onClick={() => dispatch(setBasketOpened(true))}
      >
        <ShoppingBasketIcon />
      </BasketButton>
      <BasketModal onClose={() => dispatch(setBasketOpened(false))} />
      <Container>
        <Grid container gap={2} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product.id}>
              <ProductItem
                product={product}
                onAddToBasket={() => handleAddToBasket(product)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
