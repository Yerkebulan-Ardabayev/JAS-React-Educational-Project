import {useEffect, useMemo, useState} from "react";
import {fetchCategories} from "../fetchers/fetchCategories";
import {CategoriesGrid} from "../components/CategoriesGrid";
import {Container} from "../components/Container";
import {useSearchParams} from "react-router-dom";
import {Breadcrumbs} from "../components/Breadcrumbs";

function findNode(id, category) {
  if (category?.id+'' === id+'') {
    return category
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

function getCategoryPath(id, category) {
  const node = findNode(id, category);
  if (!id || !node) {
    return [category]
  }
  return [...getCategoryPath(node.parentId, category), node]
}

export const HomePage = () => {
  const [category, setCategory] = useState()
  const [ searchParams ] = useSearchParams()
  const categoryId = searchParams.get('categoryId')

  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategory({
        name: 'Главная',
        id: undefined,
        childCategories: categories,
      })
    })
  }, [])

  const currentCategory = useMemo(() => {
    if (!categoryId || !category) return category
    return findNode(+categoryId, category)
  }, [category, categoryId])

  const links = useMemo(() => {
    if (!category) return [];

    return getCategoryPath(categoryId, category).map(category => ({
      label: category.name,
      to: category.id ? '/home?categoryId='+category.id : '/home',
    }));
  }, [categoryId, category])


  return (
    <Container style={{ marginTop: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Breadcrumbs links={links} />
      </div>
      <CategoriesGrid categories={currentCategory?.childCategories} />
    </Container>
  )
}
