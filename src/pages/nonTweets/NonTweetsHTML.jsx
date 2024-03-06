import React from "react";
import "../../styles.css";

import NonTweet from "./NonTweet.jsx";


export default function NonTweetsHTML(props) {
    
  
  return (
    <div className={props.quoting ? "tweetHTMLquoting" : "tweetHTML"} key={ props.tweetData.tweet_id }>
      <NonTweet tweetData={ props.tweetData } user={ props.user } hide_bottom_bar={ props.quoting || props.hideBottomBar } />
    </div>

  );
}