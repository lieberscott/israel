import React, { Component } from "react";
import { Route, Routes } from 'react-router-dom';


import Home from "../pages/Home";
// import Tweet from "../pages/tweet";
// import TweetsHTML from "../pages/tweetsHTML";
// import TweetMain from "../pages/tweetMainFetch";
// import CategoryPage from "../pages/categoryPage";
import Carousel from "../pages/Carousel.jsx";

/**
* The router is imported in app.jsx
*
* Our site just has two routes in it–Home and About
* Each one is defined as a component in /pages
* We use Switch to only render one route at a time https://github.com/molefrog/wouter#switch-
*/

const App = () => (
  <div>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/category/:cat" element={<Carousel />} />
    </Routes>
  </div>
);

export default App;


/*
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import List from './pages/List.jsx';

import Tweet from "./pages/private/Tweet.jsx";
import TweetsHTML from "./pages/private/TweetsHTML.jsx";
import TweetMain from "./pages/private/TweetsHTML.jsx";
import Carousel from "./pages/public/Carousel.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route path='/list' element={<List />}/>
        <Route path="/tweet" element={<Tweet />} />
        <Route path="/tweetsHTML" element={<TweetsHTML />} />
        <Route path="/tweetMain" element={<TweetMain />} />
        <Route path="/category/:cat" element={<Carousel />} />
      </Routes>
    </div>
  )
}

export default App;
*/