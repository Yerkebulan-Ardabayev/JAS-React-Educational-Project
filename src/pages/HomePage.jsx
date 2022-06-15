import { useEffect, useState } from "react";
import { fetchCategories } from "../fetchers/fetchCategories";
import { CategoriesGrid } from "../components/CategoriesGrid";
import { Container } from "../components/Container";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchCatalogItem } from "../fetchers/fetchCatalogItem";
import { ProductGrid } from "../components/ProductGrid";


function svgNoContentReturn() {
  return (
    <div style={{
      height: "250px",
      width: "100%",
      margin: "0 auto",
      marginLeft: "250px",
    }}>
      <svg
        width="550"
        height="250"
        viewBox="0 0 271 196"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_7_872)">
          <circle cx="175" cy="92" r="90" fill="#2e5823" />
          <rect x="3" y="46" width="150" height="150" fill="#2f2e55" />
          <path d="M174.5 64L265.866 196H83.1343L174.5 64Z" fill="#441930" />
        </g>
        <defs>
          <clipPath id="clip0_7_872">
            <rect width="271" height="196" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span>
        <h2>В настоящее время товара в наличии нет</h2>
      </span>
    </div>
  );
}

export const HomePage = () => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [category, setCategory] = useState();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategories(categories);
      setCategory({
        name: "Главная",
        id: undefined,
        childCategories: categories,
      });
    });
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchCatalogItem(categoryId).then((products) => {
        setProducts(products.content);
      });
    }
  }, [categoryId]);

  return (
    <Container style={{ marginTop: "20px" }}>
      <div style={{ display: "flex" }}>
        <CategoriesGrid
          categories={categories}
          onClick={(category) => navigate("/home?categoryId=" + category.id)}
        />
        {products?.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          svgNoContentReturn()
        )}
      </div>
      
    </Container>
  );
};
