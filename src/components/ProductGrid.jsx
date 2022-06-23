import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { ProductItem } from "./ProductItem";

export const ProductGrid = ({ products }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      height="100%"
    >
      {products?.map((product) => (
        <Grid item xs={4} sm={4} md={4} key={product.id}>
          <Link className="LinkSingleProduct" to={`/product/${product.id}`}>
            <ProductItem>{product.name}</ProductItem>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
