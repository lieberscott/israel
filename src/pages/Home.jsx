import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles.css";
import { categories, einat, sam } from "../constants.js";

import CategoryHomepage from "./homepage/CategoryHomepage.jsx";
import NonTweet from "./nonTweets/NonTweet.jsx";



const Home = () => {

  const handleClick = async () => {
    const response = await fetch(`/add_to_mongo`);
    const json = await response.json();

    console.log("json : ", json);
  }


  return (
    <div className="homePageWrapper">
      <div className="gridWrapper">
      <p className="textWhite">Start with these two important videos. Then scroll down for more.</p>

      <div className="gridOuter" container spacing={1}>
        <div className="gridTopVideo" position="relative" xs={5} md={5} spacing={2}>
          <NonTweet tweetData={ einat } user={ einat.user } />
        </div>
        <div className="gridTopVideo" position="relative" xs={5} spacing={2} md={5}>
          <NonTweet tweetData={ sam } user={ sam.user } />
        </div>
      </div>
        
      <div className="gridOuter2">
        
        { categories.map((item, i) => {
          return ( i < 7 ?
              <div className={item.xs === 4 ? "gridItem4" : "gridItem8"} key={item.category}>
                <Link to={`/category/${item.name}`} state={{ name: item.name, category: item.category, subcategories: item.subcategories }}>
                  <CategoryHomepage category={ item.category } name={ item.name } />
                </Link>
              </div>
              :
              <div className="gridItem12" key={ item.category } xs={ item.xs}>
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
              </div>
          )
        })}
        <p className="gridItem12">Hostages, fallen soldiers, victims of the Oct. 7 attack nor anyone else has specifically endorsed — nor been asked to endorse — the views expressed on this site. Any view expressed on the site is that of the authors themselves.</p>

        
      </div>
    </div>
    </div>
  );
}
export default Home;