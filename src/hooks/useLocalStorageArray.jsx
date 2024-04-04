import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const useLocalStorageArray = (key, initialValue = []) => {
  const [items, setItems] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [key, items]);

  const addItem = (newItem) => {
    const newItemWithId = { id: uuidv4(), ...newItem };
    setItems([...items, newItemWithId]);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const getAllItems = () => {
    return items;
  };

  const clearItems = () => {
    localStorage.removeItem(key);
    setItems([]);
  };

  return {
    items,
    addItem,
    deleteItem,
    getAllItems,
    clearItems,
  };
};

export default useLocalStorageArray;
