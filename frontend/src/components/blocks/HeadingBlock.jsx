import React, { useState } from 'react';

const HeadingBlock = ({ initialText = '' }) => {
  const [text, setText] = useState(initialText);

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