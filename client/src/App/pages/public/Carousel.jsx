import { useEffect, useState } from "react";
import "../../../styles.css";

import TweetMainData from "../private/TweetMainData.jsx";
import NonTweetMainData from "../nonTweets/NonTweetMainData.jsx";

const buttons = ["#0088FE", "#00C49F"];
const delay = 80500;

export default function Carousel(props) {
  const [index, setIndex] = useState(0);
  const [json, setJson] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [setKeepCheckingForNewTweets, keepCheckingForNewTweets] = useState(true);
  
  
  useEffect(() => {
   getNewTweets(0);
  }, [props.params.cat]);

  const getNewTweets = async () => {
    const data = await fetch(`/tweets_by_category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ category: props.params.cat, skip: json.length })
    });
    
    const importedJson = await data.json();
    console.log("importedJson.length. ", importedJson.length);

    if (importedJson.length < 10) { // < 10 (10 should be whatever number is "limit" on the Node/Mongo side)
      setKeepCheckingForNewTweets(false);
    }

    setJson(prev => prev.concat(importedJson));
    if (!loaded) {
      setLoaded(true);
    }
  }


  const checkForNewTweets = () => {
    if (json.length - 8 > index) {
      getNewTweets();
    }
  }


  return (
    <div className="slideshow">
     { loaded ? <><div
        className="slideshowSlider"
        style={{ transform: [`translate3d(${-index * 60}%, 0, 0)`] }}
      >
          {json.map((item, i) => (
            <div className="slide">
              { props.params.cat === "pro_palestine_lies" || props.params.cat === "hamas_lies" ? <TweetMainData key={ item.id } item={item} scale={ index === i } /> : <NonTweetMainData key={ item.id } item={item} scale={ index === i } /> }
            </div>
          ))}
      </div>

      <div className="slideshowDots">
        {buttons.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${""}`}
            onClick={() => {
              checkForNewTweets();
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