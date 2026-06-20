import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Button from '../components/common/Button';

const Marketplace = () => {
  const [templates] = useState([
    { id: 101, title: 'Stoic Daily Reflection', author: 'MarcusA', downloads: 142 },
    { id: 102, title: 'Oxford Weekly Study Schedule', author: 'Scholar199', downloads: 89 },
    { id: 103, title: 'Botanical Field Notes', author: 'Dr_Flora', downloads: 256 },
  ]);

  const handleDuplicate = (id) => {
    alert(`Duplicating template ${id} to your desk...`);
    // templateApi.duplicateTemplate(id);
  };

  return (
    <div className="flex h-screen w-full bg-[#fdfbf7]">
      <Sidebar activeTab="Marketplace" />
      
      <main className="flex-1 p-12 overflow-y-auto custom-scrollbar">
        <header className="mb-10 border-b border-academia-leather pb-6">
          <h2 className="text-4xl font-serif font-semibold text-academia-ink">The Library</h2>
          <p className="text-academia-inkLight mt-2 italic font-body">Browse manuscripts and templates shared by fellow scholars.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="bg-academia-paper p-6 border border-academia-leather shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-serif font-medium text-academia-ink">{template.title}</h3>
                  <span className="text-xs bg-academia-parchment border border-academia-leather px-2 py-1 rounded-sm text-academia-inkLight">
                    {template.downloads} copies
                  </span>
                </div>
                <p className="text-sm text-academia-inkLight font-body mb-6">Penned by @{template.author}</p>
              </div>
              
              <Button variant="secondary" onClick={() => handleDuplicate(template.id)} className="text-xs">
                Copy to My Desk
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Marketplace;