import React, { useEffect, useState } from "react";
import "../styles.css";
import { useLocation, Link } from 'react-router-dom';


import TweetMainData from "./TweetMainData.jsx";
import NonTweetMainData from "./nonTweets/NonTweetMainData.jsx";

const buttons = ["#0088FE", "#00C49F"];
const delay = 80500;

export default function Carousel(props) {

  const location = useLocation();
  const { category, name, subcategories } = location.state;

  const [index, setIndex] = useState(0);
  const [json, setJson] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [keepCheckingForNewTweets, setKeepCheckingForNewTweets] = useState(true);

  useEffect(() => {
    getNewTweets(true);
   }, [category]);


  const getNewTweets = async (createNewArr) => {
    const data = await fetch(`/api/tweets_by_category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ category, skip: createNewArr ? 0 : json.length })
    });
    
    const importedJson = await data.json();
    console.log("importedJson.tweets.length : ", importedJson.tweets.length);

    if (!importedJson.tweets || importedJson.tweets.length === 0) { // < 10 (10 should be whatever number is "limit" on the Node/Mongo side)
      setKeepCheckingForNewTweets(false);
    }

    if (createNewArr) {
      setJson(importedJson.tweets);
      setIndex(0);
      setKeepCheckingForNewTweets(true);
    }
    else {
      setJson(prev => prev.concat(importedJson.tweets));
    }
    if (!loaded && importedJson.tweets.length > 0) {
      setLoaded(true);
    }
  }


  const checkForNewTweets = () => {
    console.log("checkForNewTweets index : ", index);
    if (json.length - 5 < index) {
      console.log("getNewTweets")
      getNewTweets();
    }
  }


  return (
    <div className="slideshow">
      <div className="links">
      {subcategories.map((subcat, j, arr) => {
        return (< div className="links" key={ subcat.name}>
        <Link key={ subcat.category } to={`/category/${subcat.name}`} state={{ name: subcat.name, category: subcat.category, subcategories: subcategories }}><div className={ subcat.name === name ? "subcategoryBold" : "subcategory"}>{subcat.name}</div></Link>
          { j === arr.length - 1 ? [] : <span className="divider">|</span> }
      </div> )
      })}
      </div>
     { loaded ? <><div
        className="slideshowSlider"
        style={{ transform: [`translate3d(${-index * 600}px, 0, 0)`] }}
      >
          {json.map((item, i) => (
            <div key={item.id} className="slide">
              { category === "pro_palestine_lies" || category === "hamas_lies" ? <TweetMainData key={ item.id } item={item} scale={ index === i } /> : <NonTweetMainData key={ item.id } item={item} scale={ index === i } /> }
            </div>
          ))}
      </div>

      {/* <Buttons setIndex={ setIndex } pageNum={category} tweetData={json[index]}  /> */}

      <div className="slideshowDots">
        {buttons.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${""}`}
            onClick={() => {
              console.log("keepCheckingForNewTweets : ", keepCheckingForNewTweets);
              if (keepCheckingForNewTweets) {
                checkForNewTweets();
              }
              setIndex(prev => {
                if (idx === 0 && prev <= 0) {
                  return 0;
                }
                else if (idx === 1 && prev >= json.length) {
                  return json.length;
                }
                else if (idx === 0) {
                  return prev - 1;
                }
                else if (idx === 1) {
                  return prev + 1;
                }
                else {
                  return prev;
                }
              });
            }}
          ></div>
        ))}
          </div></> : [] }
    </div>
  );
}