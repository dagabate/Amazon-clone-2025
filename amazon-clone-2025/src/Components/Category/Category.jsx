import React from "react";
import CategoryCard from "./CategoryCard";
import { categoryImage } from "./categoryFullInfo";
import classes from "./Category.module.css";

function Category() {
  return (
    <section className={classes.category_container}>
      {categoryImage.map((infos, index) => (
        <CategoryCard key={index} data={infos} />
      ))}
    </section>
  );
}

export default Category;
