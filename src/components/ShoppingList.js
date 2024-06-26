import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import itemData from "../data/items";

function ShoppingList({ items }) {
  const [ itemList, setItemList ] = useState(itemData)
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText ] = useState("");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  function handleItemFormSubmit(newItem) {
    setItemList([...itemList, newItem])
  }


  const itemsToDisplay = itemList.filter((item) => {
    if (selectedCategory !== "All" && item.category !== selectedCategory) {
      return false;
    } 
    return item.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit = {handleItemFormSubmit} />
      <Filter onCategoryChange={handleCategoryChange} 
              onSearchChange = {(event) => setSearchText(event.target.value)}
              searchText = {searchText} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}//form

export default ShoppingList;
