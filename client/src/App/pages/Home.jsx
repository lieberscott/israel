import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import "../../styles.css";
import { categories } from "../../categories.js";

import CategoryHomepage from "./private/CategoryHomepage.jsx";



const Home = () => {

  const handleClick = async () => {
    const response = await fetch(`/add_to_mongo`);
    const json = await response.json();

    console.log("json : ", json);
  }


  return (
    <div className="homePageWrapper">
      <div className="textWhite">This site is meant to provide an easy place for people to learn about the current conflict.</div>
      <div className="gridWrapper">
      <Grid container spacing={1}>
        
        { categories.map((item, i) => {
          return ( i < 7 ?
              <Grid key={item.category} position="relative" borderRadius={6} height={250} xs={item.xs} md={item.xs}>
                <Link to={`/category/${item.name}`} state={{ name: item.name, category: item.category, subcategories: item.subcategories }}>
                  <CategoryHomepage category={ item.category } name={ item.name } />
                </Link>
              </Grid>
              :
              <Grid key={ item.category } xs={ item.xs}>
                <Link key={item.category} to={`/category/${item.category}`} state={{ name: item.name, category: item.category, subcategories: item.subcategories }}>
                  <h3 className="homepageText">{ item.name }</h3>
                </Link>
                {item.subcategories.map((subcategory, j) => {
                  return (
                    <Link key={subcategory.category} to={`/category/${subcategory.name}`} state={{ name: subcategory.name, category: subcategory.category, subcategories: item.subcategories }}>
                      <div className="homepageText">{subcategory.name}</div>
                    </Link>
                  )
                })}
              </Grid>
          )
        })}
        
      </Grid>
    </div>
    </div>
  );
}
export default Home;