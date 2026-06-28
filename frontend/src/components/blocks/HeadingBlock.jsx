import React, { useState, useEffect } from 'react';

const HeadingBlock = ({ initialText = '', onChange }) => {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    if (onChange) onChange({ type: 'heading', content: text });
  }, [text, onChange]);

  return (
    <div className="w-full mb-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Chapter / Section Heading..."
        className="w-full text-2xl font-serif font-semibold text-academia-ink bg-transparent outline-none placeholder-academia-inkLight/40 border-b-2 border-academia-leather/60 pb-2 focus:border-academia-gold transition-colors"
      />
    </div>
  );
};

export default HeadingBlock;