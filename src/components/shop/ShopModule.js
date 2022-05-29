import { IconButton, styled } from "@mui/material";
import { Container, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "./fetchProducts";
import { ProductItem } from "./ProductItem";
import { BasketModal } from "./BasketModal";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const BasketButton = styled(IconButton)`
  position: fixed;
  z-index: 2;
  right: 15px;
  top: 150px;
  border: 1px solid currentColor;
  background-color: transparent;
`;
export const ShopModule = () => {
  const [products, setProducts] = useState([]);
  const [openBasket, setOpenBasket] = useState(false);
  const [basket, setBasket] = useState([]);

  

  // function deleteItemFromBasket(id) {
  //   setBasket(basket.filter(item => item.id !== id));
  // }
  const deleteItemFromBasket = useCallback(
    id => {
      setBasket(basket.filter(item => item.id !== id));
    },
    [basket]
  );
  
  
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleAddToBasket = useCallback(
    (product) => {
      const newBasket = [...basket];
      const elem = newBasket.find((item) => item.id === product.id);
      if (elem) {
        elem.count += 1;
      } else {
        newBasket.push({
          ...product,
          count: 1
        });
      }
      setBasket(newBasket);
    },
    [basket]
  );

  const handleBasketItemCount = useCallback(
    (product, increment) => {
      const newBasket = [...basket];
      const elem = newBasket.find((item) => item.id === product.id);
      if (elem) {
        elem.count += increment;
        setBasket(newBasket);
      }
      if (elem?.count === 0) {
        setBasket(newBasket.filter((item) => item.id !== product.id));
      }
    },
    [basket]
  );

  return (
    <>
      <BasketButton
        color="secondary"
        size="small"
        onClick={() => setOpenBasket(true)}
      >
        <IconButton  aria-label="add to shopping cart" color="success">
          <AddShoppingCartIcon />
        </IconButton>
      </BasketButton>
      <BasketModal
        open={openBasket}
        onClose={() => setOpenBasket(false)}
        basket={basket}
        onBasketItemCountChange={handleBasketItemCount}
        onDeleteItem={deleteItemFromBasket}
      />
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
