import { useEffect, useMemo, useState } from "react";
import { fetchCategories } from "../fetchers/fetchCategories";
import { CategoriesGrid } from "../components/CategoriesGrid";
import { Container } from "../components/Container";
import { useSearchParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";

function findNode(id, category) {
  if (category?.id + "" === id + "") {
    return category;
  }
  if (category?.childCategories) {
    for (let childCategory of category.childCategories) {
      const node = findNode(id, childCategory);
      if (node) {
        return node;
      }
    }
  }
}

function noCategory(category) {
  if (!category) {
    return true;
  }
  if (!category.childCategories) {
    return true;
  }
  if (category.childCategories.length === 0) {
    return true;
  }
  return false;
}

function svgNoContentReturn(category) {
  if (noCategory(category)) {
    return (style = { display: "block" }) => (
      <div className="svg-no-content" style={style}>
      </div>
    );
  }
  return null;
}


function getCategoryPath(id, category) {
  const node = findNode(id, category);
  if (!id || !node) {
    return [category];
  }
  return [...getCategoryPath(node.parentId, category), node];
}

export const HomePage = () => {
  const [category, setCategory] = useState();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategory({
        name: "Главная",
        id: undefined,
        childCategories: categories,
      });
    });
  }, []);

  const currentCategory = useMemo(() => {
    if (!categoryId || !category) return category;
    return findNode(+categoryId, category);
  }, [category, categoryId]);

  const links = useMemo(() => {
    if (!category) return [];

    return getCategoryPath(categoryId, category).map((category) => ({
      label: category.name,
      to: category.id ? "/home?categoryId=" + category.id : "/home",
    }));
  }, [categoryId, category]);

  return (
    <Container style={{ marginTop: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Breadcrumbs links={links} />
      </div>
      <CategoriesGrid categories={currentCategory?.childCategories} />
      <div className="svg-no-content" svgNoContentReturn={svgNoContentReturn}>
        <svg
          width="271"
          height="196"
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
      </div>
      {noCategory(currentCategory) && (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "50px",
            fontWeight: "bold",
            color: "#221a1a",
          }}
        >
          Товара в наличии нет
        </div>
      )}
    </Container>
  );
};
