import styled from "@emotion/styled";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 250px;
`;

const CategoryItems = ({ categories, onClick }) => {
  return (
    <>
      {categories?.map((category) => (
        <TreeItem
          onClick={() => onClick(category)}
          nodeId={category.id}
          label={category.name + " " + category.childCount}
        >
          {category.childCategories && category.childCategories.length > 0 ? (
            <CategoryItems
              onClick={onClick}
              categories={category.childCategories}
            />
          ) : null}
        </TreeItem>
      ))}
    </>
  );
};

export function CategoriesGrid({ categories, onClick }) {
  return (
    <Flex>
      <TreeView
        aria-label="multi-select"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <CategoryItems categories={categories} onClick={onClick} />
      </TreeView>
    </Flex>
  );
}
