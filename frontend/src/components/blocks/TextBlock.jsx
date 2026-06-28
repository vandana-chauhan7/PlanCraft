import React, { useState, useEffect } from 'react';

const TextBlock = ({ initialText = '', onChange }) => {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    if (onChange) onChange({ type: 'text', content: text });
  }, [text, onChange]);

  return (
    <div className="w-full">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Begin writing your thoughts here..."
        className="w-full min-h-[100px] bg-transparent outline-none resize-none text-academia-ink font-body leading-relaxed placeholder-academia-inkLight/60 focus:ring-0 border-none p-0"
        style={{ fieldSizing: 'content' }}
      />
    </div>
  );
};

export default TextBlock;