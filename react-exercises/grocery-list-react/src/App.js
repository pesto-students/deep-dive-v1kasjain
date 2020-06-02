import React, { useState } from 'react';
import './App.css';

function GroceryList({ groceryItems, onPurchase }) {
  return (
    <ul>
      {groceryItems.map((item, key) => {
        const { name, quantity, isPurchased } = item;
        return (<li
          key={key}
          onClick={() => onPurchase(key)}
          style={{ color: isPurchased ? "#ff0000" : "000000" }} >
          <span>{name}</span>
          <span className="quantity">{quantity}</span>
        </li>)
      })}
    </ul>
  );
}

function GroceryForm({ setGroceryItems, currentItems }) {
  const [value, setInputValue] = useState('');
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

    setGroceryItems(listItems);
    setInputValue('');
  };

  const onInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value)
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" id="value" value={value} onChange={onInputChange} />
      <button type="submit">Add</button>
    </form>
  );
}

const defaultItems = [
  { name: "butter", quantity: 1, isPurchased: false },
  { name: "salt", quantity: 1, isPurchased: false },
  { name: "sugar", quantity: 1, isPurchased: false },
]
function App() {
  const [groceryItems, setGroceryItems] = useState(defaultItems);
  const clearAllItems = (e) => {
    setGroceryItems([]);
  }

  const onPurchase = (index) => {
    const newList = [...groceryItems];
    newList[index].isPurchased = !newList[index].isPurchased;
    setGroceryItems(newList);
  }

  return (
    <div className="App">
      <h1>Grocery List</h1>
      <GroceryForm setGroceryItems={setGroceryItems} currentItems={groceryItems} />
      <div className="listHeader">
        <div className="itemsText">Items: </div>
        <button onClick={clearAllItems}>Clear All</button>
      </div>
      <GroceryList groceryItems={groceryItems} onPurchase={onPurchase} />
    </div>
  );
}

export default App;
