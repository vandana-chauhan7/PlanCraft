import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import Button from '../components/common/Button';
import { templateApi } from '../api/templateApi';

const Marketplace = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await templateApi.getAll();
        setTemplates(data);
      } catch (err) {
        console.error('Failed to load marketplace:', err);
        setError('Unable to fetch marketplace templates at the moment. Please refresh.');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleDuplicate = async (templateId) => {
    setMessage(null);
    setError(null);
    try {
      await templateApi.duplicate(templateId);
      setMessage('Template copied to your desk. It will appear on your dashboard shortly.');
    } catch (err) {
      console.error('Unable to copy template:', err);
      setError('Copy failed. Please try again or check your connection.');
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#fdfbf7]">
      <Sidebar activeTab="Marketplace" />
      
      <main className="flex-1 p-12 overflow-y-auto custom-scrollbar">
        <header className="mb-10 border-b border-academia-leather pb-6">
          <h2 className="text-4xl font-serif font-semibold text-academia-ink">The Library</h2>
          <p className="text-academia-inkLight mt-2 italic font-body">Browse manuscripts and templates shared by fellow scholars.</p>
        </header>

        {loading ? (
          <div className="text-center mt-20 text-academia-inkLight font-body italic">Loading marketplace...</div>
        ) : error ? (
          <div className="text-center mt-20 text-[#8c3b3b] font-body italic">{error}</div>
        ) : (
          <>
            {message && <div className="mb-6 px-4 py-3 rounded bg-academia-gold/10 text-academia-ink font-body">{message}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.length === 0 ? (
                <div className="col-span-full text-center text-academia-inkLight font-body italic py-12 border border-academia-leather rounded-lg bg-academia-paper">
                  The marketplace is currently quiet. Publish a planner to seed the library.
                </div>
              ) : (
                templates.map((template) => (
                  <div key={template.id} className="bg-academia-paper p-6 border border-academia-leather shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-serif font-medium text-academia-ink">{template.title}</h3>
                        <span className="text-xs bg-academia-parchment border border-academia-leather px-2 py-1 rounded-sm text-academia-inkLight">
                          Template
                        </span>
                      </div>
                      <p className="text-sm text-academia-inkLight font-body mb-6">Shared by user #{template.user_id}</p>
                    </div>
                    <Button variant="secondary" onClick={() => handleDuplicate(template.id)} className="text-xs">
                      Copy to My Desk
                    </Button>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Marketplace;