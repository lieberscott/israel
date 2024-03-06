import React, { useState, useEffect } from "react";
import { Link, BrowserRouter } from 'react-router-dom';


/**
* This code defines the react app
*
* Imports the router functionality to provide page navigation
* Defines the Home function outlining the content on each page
* Content specific to each page (Home and About) is defined in their components in /pages
* Each page content is presented inside the overall structure defined here
* The router attaches the page components to their paths
*/

// Import and apply CSS stylesheet
import "./styles.css";
import { categories } from "./constants.js";

// Where all of our pages come from
import PageRouter from "./components/router.jsx";

// Home function that is reflected across the site
export default function Home() {
  return (
    <BrowserRouter>
      <main role="main" className="wrapper">
        <div className="links">
          <Link to="/" state={{ name: "", category: "", categories }}><div className="linksText">Home</div></Link>
          <span className="divider">|</span>
        { categories.map((item, i) => {
          return i < 5 ?
          (
          <div className="links" key={ item.name}>
            <Link to={`/category/${item.subcategories[0].name}`} state={{ name: item.subcategories[0].name, category: item.subcategories[0].category, subcategories: item.subcategories }}><div className="linksText">{ item.subcategories[0].name }</div></Link>
              { i === 4 ? [] : <span className="divider">|</span> }
          </div> )
          : []
        })}
        </div>
        <div className="content">
          {/* Router specifies which component to insert here as the main content */}
          <PageRouter />
        </div>
      </main>
    </BrowserRouter>
  );
}