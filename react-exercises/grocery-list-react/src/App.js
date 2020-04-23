import React, { useState } from 'react';
import './App.css';

function GroceryList({ groceryList, markPurchased }) {


  return (
    <ul>
      {groceryList.map((item, key) => <li
        key={key}
        onClick={() => markPurchased(key)}
        style={{ color: item.isPurchased ? "#ff0000" : "000000" }}
      >
        <span>{item.name}</span>
        <span className="quantity">{item.quantity}</span>
      </li>)}
    </ul>
  );
}

function AddGroveryItem({ setGroceryItem, currentItems }) {
  const [value, setValue] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      return true;
    }
    let isItemInList = false;
    let listItems = [...currentItems];
    for (const item of listItems) {
      if (item.name === value) {
        isItemInList = true;
        item.quantity += 1;
      }
    }

    if (!isItemInList) {
      listItems = [...currentItems, { name: value, quantity: 1, isPurchased: false }]
    }
    setGroceryItem(listItems);
    setValue('');
  };

  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value)
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange} />
      <button type="submit">Add</button>
    </form>
  );
}

const defaultItems = [
  { name: "butter", quantity: 1, isPurchased: false },
  { name: "salt", quantity: 1, isPurchased: false },
  { name: "suger", quantity: 1, isPurchased: false },
]
function App() {
  const [groceryList, setGroceryItem] = useState(defaultItems);
  const claerAllItems = (e) => {
    setGroceryItem([]);
  }

  const markPurchased = (index) => {
    const newList = [...groceryList];
    newList[index].isPurchased = !newList[index].isPurchased;
    setGroceryItem(newList);
  }

  return (
    <div className="App">
      <h1>Grocery List</h1>
      <AddGroveryItem setGroceryItem={setGroceryItem} currentItems={groceryList} />
      <div className="listHeader">
        <div className="itemsText">Items: </div>
        <button onClick={claerAllItems}>Clear All</button>
      </div>
      <GroceryList groceryList={groceryList} markPurchased={markPurchased} />
    </div>
  );
}

export default App;
