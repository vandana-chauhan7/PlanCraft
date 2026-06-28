import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Button from '../components/common/Button';
import { plannerApi } from '../api/plannerApi';

const Planners = () => {
  const navigate = useNavigate();
  const [planners, setPlanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanners = async () => {
      try {
        const data = await plannerApi.getAll();
        setPlanners(data);
      } catch (err) {
        console.error('Unable to load planners:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanners();
  }, []);

  return (
    <div className="flex h-screen w-full bg-academia-parchment">
      <Sidebar activeTab="My Planners" />
      <main className="flex-1 p-12 overflow-y-auto custom-scrollbar">
        <header className="flex justify-between items-end mb-10 border-b border-academia-leather pb-6">
          <div>
            <h2 className="text-4xl font-serif font-semibold text-academia-ink">My Planners</h2>
            <p className="text-academia-inkLight mt-2 italic font-body">All your planner drafts and templates.</p>
          </div>
          <Button variant="primary" onClick={() => navigate('/editor')}>+ Draft New Planner</Button>
        </header>

        {loading ? (
          <div className="text-center mt-20 text-academia-inkLight font-body italic">Loading your planners...</div>
        ) : planners.length === 0 ? (
          <div className="text-center mt-20 text-academia-inkLight font-body italic">No planners yet. Create one to begin.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {planners.map((planner) => (
              <div 
                key={planner.id}
                onClick={() => navigate(`/editor/${planner.id}`)}
                className="group bg-academia-paper p-6 border border-academia-leather shadow-paper hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer relative min-h-[160px] flex flex-col justify-between"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-academia-gold/60 group-hover:bg-academia-gold transition-colors"></div>
                <div>
                  <h3 className="text-xl font-serif font-medium group-hover:text-[#8a6b46] transition-colors line-clamp-2">{planner.title}</h3>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <p className="text-xs text-academia-inkLight font-body uppercase tracking-wider">{planner.is_template ? 'Template copy' : 'Draft saved'}</p>
                  <svg className="w-5 h-5 text-academia-leather group-hover:text-academia-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Planners;
