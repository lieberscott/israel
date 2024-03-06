import React, { useState, useEffect } from "react";

import useInterval from "../../hooks/useInterval.js";
import "../../styles.css";


export default function CategoryHomepage(props) {
  
  const { category, name } = props;
  
  const [loaded, setLoaded] = useState(false);
  
  const [imgArr, setImgArr] = useState([]);
  
  /* CSS state variables */
  const [fadeIn, setFadeIn] = useState(true);
  const [changeImageCounter, setChangeImageCounter] = useState(0);
  const [indexOne, setIndexOne] = useState(0);
  const [indexTwo, setIndexTwo] = useState(1);
  
  
  const manageRotateImage = () => {

    if (changeImageCounter === 0) {
      setIndexOne(prev => ((prev + 2) % (imgArr.length - 3)));
      setChangeImageCounter(prev => prev + 1);
    }
    else if (changeImageCounter === 3) {
      setFadeIn(prev => !prev);
      setChangeImageCounter(prev => prev + 1);
    }
    else if (changeImageCounter === 4) {
      setIndexTwo(prev => ((prev + 2) % (imgArr.length - 3)));
      setChangeImageCounter(prev => prev + 1);
    }
    else if (changeImageCounter === 7) {
      setFadeIn(prev => !prev);
      setChangeImageCounter(0);
    }
    else {
      setChangeImageCounter(prev => prev + 1);
    }
  }
  
  useEffect(() => {}, [fadeIn]);
  
  const randomInterval = Math.random() * (4500 - 2500) + 2500;
  useInterval(manageRotateImage, randomInterval);
  
  useEffect(() => {
    (async () => {
      
      /* Fetch all data */
      const dataStr = await fetch(`/api/get_home_images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ category })
      });
      
      /* Convert to JSON */
      const dataJson = await dataStr.json();
      
      
      /* Add to State*/
      setImgArr(dataJson.data);
      
      /* Set Loaded True */
      setLoaded(true);
      
    })();
  }, [name])
  
 

  return (
    <>
      { loaded ? (
        <div className="categoryHomepage">
          <p className="categoryName">{name}</p>
          <div className="categoryImageWrapper">
            <img className={ fadeIn ? "categoryImageIn" : "categoryImageOut"} src={imgArr[indexOne].img_url} />
          </div>
          <div className="categoryImageWrapper2">
            <img className={ !fadeIn ? "categoryImageIn" : "categoryImageOut"} src={imgArr[indexTwo].img_url} />
          </div>
        </div> ) : [] }
    </>
  );
}
