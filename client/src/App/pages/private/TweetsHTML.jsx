import * as React from "react";
import "../../../styles.css";

import TopBar from "./TopBar.jsx";
import Tweet from "./Tweet.jsx";


export default function TweetsHTML(props) {
    
  
  return (
    <div className={props.quoting ? "tweetHTMLquoting" : "tweetHTML"} key={ props.tweetData.tweet_id }>
      <TopBar user={ props.quoting ? props.tweetData.user : props.tweetData.user } />
      <Tweet tweetData={ props.tweetData } hide_bottom_bar={ props.quoting } />
    </div>

  );
}