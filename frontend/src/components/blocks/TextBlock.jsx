import React, { useState } from 'react';

const TextBlock = ({ initialText = '' }) => {
  const [text, setText] = useState(initialText);

  return (
    <div className="w-full">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Begin writing your thoughts here..."
        className="w-full min-h-[100px] bg-transparent outline-none resize-none text-academia-ink font-body leading-relaxed placeholder-academia-inkLight/60 focus:ring-0 border-none p-0"
        style={{ fieldSizing: 'content' }} // New CSS feature for auto-growing textareas (fallback to standard rows if needed)
      />
    </div>
  );
};

export default TextBlock;