import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-academia-ink/30 backdrop-blur-[2px] transition-opacity">
      {/* Click-away backdrop */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      {/* Modal Content Box */}
      <div className="bg-academia-parchment w-full max-w-md p-8 border border-academia-leather shadow-paper rounded-sm relative z-10 animate-fade-in-up">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-academia-inkLight hover:text-academia-ink transition-colors p-1"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        {title && (
          <h3 className="text-2xl font-serif text-academia-ink mb-6 border-b border-academia-leather/50 pb-2">
            {title}
          </h3>
        )}

        {/* Body */}
        <div className="font-body text-academia-ink">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;