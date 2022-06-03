import {CategoryCounter, CategoryItem} from "./CategoryItem";
import styled from "@emotion/styled";
import {LinkBase} from "./LinkBase";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  gap: 15px;
`

export function CategoriesGrid({ categories }) {
  return (
    <Grid>
      {categories?.map((category) => (
        <LinkBase to={`/home?categoryId=${category.id}`}>
          <CategoryItem>
            {category.name}
            <CategoryCounter>
              {category.childCount}
            </CategoryCounter>
          </CategoryItem>
        </LinkBase>
      ))}
    </Grid>
  )
}
