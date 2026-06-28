import React, { useState, useEffect } from 'react';

const ChecklistBlock = ({ initialItems = [], onChange }) => {
  const [items, setItems] = useState(initialItems.length > 0 ? initialItems : [{ text: '', done: false }]);

  useEffect(() => {
    if (onChange) onChange({ type: 'checklist', items });
  }, [items, onChange]);

  const toggleItem = (index) => {
    const newItems = [...items];
    newItems[index].done = !newItems[index].done;
    setItems(newItems);
  };

  const updateText = (index, value) => {
    const newItems = [...items];
    newItems[index].text = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { text: '', done: false }]);
  };

  return (
    <div className="w-full font-body">
      <h4 className="font-serif text-lg text-academia-ink mb-3 font-semibold border-b border-academia-leather/50 pb-1 inline-block">Tasks & Objectives</h4>
      
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start space-x-3 group">
            <button 
              onClick={() => toggleItem(index)}
              className={`mt-1 flex-shrink-0 w-5 h-5 border flex items-center justify-center transition-colors ${
                item.done 
                  ? 'bg-academia-gold border-academia-gold text-white' 
                  : 'bg-academia-parchment border-academia-leather group-hover:border-academia-gold'
              }`}
            >
              {item.done && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
            </button>
            
            <input
              type="text"
              value={item.text}
              onChange={(e) => updateText(index, e.target.value)}
              placeholder="List an item..."
              className={`flex-1 bg-transparent outline-none border-b border-transparent focus:border-academia-leather border-dashed transition-all ${
                item.done ? 'line-through text-academia-inkLight italic' : 'text-academia-ink'
              }`}
            />
          </div>
        ))}
      </div>
      
      <button 
        onClick={addItem}
        className="mt-3 text-sm text-academia-inkLight hover:text-academia-ink italic transition-colors"
      >
        + Add another item
      </button>
    </div>
  );
};

export default ChecklistBlock;