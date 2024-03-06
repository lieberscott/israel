import React, { useEffect, useState } from "react";

import "../styles.css";


export default function TweetMainData() {
  
  
  useEffect(() => {
    (async() => {
      const data = await fetch(`/api`);
      const json = await data.json();
      
      console.log("json : ", json);
    })()
  }, [])


  return (
    <div className="homepageWrapper">
      <div className="textWhite">TweetMainData</div>
    </div>
  );
}
