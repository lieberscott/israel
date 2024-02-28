import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import App from './App/App.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// Import and apply CSS stylesheet
import "./styles.css";
import { categories } from "./categories.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <main role="main" className="wrapper">
      <div className="links">
        <Link to="/" state={{ name: "", category: "", categories }}><div className="linksText">Home</div></Link>
          <span className="divider">|</span>
        { categories.map((item, i) => {
          return i < 7 ?
          (
          <div className="links" key={ item.name}>
            <Link to={`/category/${item.name}`} state={{ name: item.name, category: item.subcategories[0].category, subcategories: item.subcategories }}><div className="linksText">{ item.name }</div></Link>
              { i === 6 ? [] : <span className="divider">|</span> }
          </div> )
          : []
        })}
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