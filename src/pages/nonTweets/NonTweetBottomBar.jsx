import React, { useState, useEffect } from "react";
import "../../styles.css";


export default function NonTweetBottomBar(props) {
  
  const { user, created_at } = props;
  
  const xLogo = "https://cdn.glitch.global/d32b3b86-af7f-4e1d-94c7-4008691fb8d7/xLogo.png?v=1705678634285";

  
  return (
    <div>
      <div className="nonTweetBottomBar">
        — Written by {user.name} @{ user.screen_name } on <div><img className="nonTweetXLogo" src={xLogo} /></div><br/>
      </div>
      <span className="bottomBarDateText">{new Date(created_at).toLocaleTimeString('en-US', {hour: 'numeric', minute:'2-digit'})} · { new Date(created_at).toLocaleString('default', { month: 'short' })}. {new Date(created_at).getDate()}, {new Date(created_at).getFullYear()}</span>
    </div>
  );
}
