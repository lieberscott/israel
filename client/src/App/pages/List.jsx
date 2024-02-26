import React, { useEffect, useState, Component } from 'react';

const List = (props) => {

  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  // Retrieves the list of items from the Express app
  const getList = async () => {
    const data = await fetch('/api/getList');
    const json = await data.json();
    setList(json);
  }

  return (
    <div className="App">
      <h1>List of Items</h1>
      {/* Check to see if any items are found*/}
      {list.length ? (
        <div>
          {/* Render the list of items */}
          {list.map((item) => {
            return(
              <div key={ item }>
                {item}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h2>No List Items Found</h2>
        </div>
      )
    }
    </div>
  );
}

export default List;
