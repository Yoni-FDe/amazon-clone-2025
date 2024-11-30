import React from "react";
import CategoryItemList from  '../../Components/Category/CategoryItemList'
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";

function Category () {
  return (
    
      <section className={classes.category__container}>
        {
          CategoryItemList.map((ItemList) => (
            <CategoryCard key={ItemList.name} data={ItemList} />
          ))
        }
      </section>
    
  )
}

export default Category;
// render into pages in 'Landing'
