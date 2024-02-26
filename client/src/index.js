import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import App from './App/App.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// Import and apply CSS stylesheet
import "./styles.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <main role="main" className="wrapper">
      <div className="links">
        <Link href="/"><div className="linksText">Home</div></Link>
        <span className="divider">|</span>
        <Link href="/category/hostages"><div className="linksText">Hostages</div></Link>
        <span className="divider">|</span>
        <Link href="/category/oct7"><div className="linksText">Oct. 7</div></Link>
        <span className="divider">|</span>
        <Link href="/category/fallen_soldier"><div className="linksText">Fallen Soldiers</div></Link>
        <span className="divider">|</span>
        <Link href="/category/hamas_evil"><div className="linksText">Hamas Evil</div></Link>
      </div>
      <div className="content">
        {/* Router specifies which component to insert here as the main content */}
        <App />
      </div>
    </main>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();