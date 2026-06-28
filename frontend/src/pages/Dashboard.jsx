import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Button from '../components/common/Button';
import { plannerApi } from '../api/plannerApi';
import Calendar from '../components/common/Calendar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [planners, setPlanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanners = async () => {
      try {
        const data = await plannerApi.getAll();
        setPlanners(data);
      } catch (err) {
        console.error('Unable to load your workspace:', err);
        setError('Unable to load your desk right now. Please refresh.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlanners();
  }, []);

  // Derive urgent todo items from checklist blocks inside planners
  const urgentTodos = [];
  planners.forEach((p) => {
    const layout = p.layout || [];
    layout.forEach((block) => {
      if (block.type === 'checklist' && Array.isArray(block.items)) {
        block.items.forEach((it) => {
          if (!it.done) urgentTodos.push({ plannerId: p.id, plannerTitle: p.title, text: it.text });
        });
      }
    });
  });

  // Determine most recent planner (best-effort: last in array)
  const recentPlanner = planners.length > 0 ? planners[planners.length - 1] : null;

  return (
    <div className="flex h-screen w-full bg-academia-parchment">
      <Sidebar activeTab="Dashboard" />

      <main className="flex-1 p-12 overflow-y-auto custom-scrollbar">
        <header className="flex justify-between items-end mb-6 border-b border-academia-leather pb-4">
          <div>
            <h2 className="text-4xl font-serif font-semibold text-academia-ink">Your Desk</h2>
            <p className="text-academia-inkLight mt-2 italic font-body">Urgent tasks, calendar, and your most recent file.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="primary" onClick={() => navigate('/editor')}>+ Draft New Planner</Button>
            <Button onClick={() => navigate('/planners')}>View All Planners</Button>
          </div>
        </header>

        {loading ? (
          <div className="text-center mt-20 text-academia-inkLight font-body italic">Loading your desk...</div>
        ) : error ? (
          <div className="text-center mt-20 text-[#8c3b3b] font-body italic">{error}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Urgent To-Do List */}
            <section className="col-span-1 bg-academia-paper p-6 border border-academia-leather shadow-sm">
              <h3 className="text-xl font-serif mb-4">Urgent To-Do</h3>
              {urgentTodos.length === 0 ? (
                <p className="text-academia-inkLight italic">No urgent tasks. You're clear for now.</p>
              ) : (
                <ul className="space-y-3">
                  {urgentTodos.slice(0, 10).map((t, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <div>
                        <p className="font-body text-sm text-academia-ink">{t.text || 'Untitled task'}</p>
                        <p className="text-xs text-academia-inkLight">From: {t.plannerTitle}</p>
                      </div>
                      <button onClick={() => navigate(`/editor/${t.plannerId}`)} className="text-academia-gold">Open</button>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Calendar */}
            <section className="col-span-1">
              <Calendar />
            </section>

            {/* Most Recent File */}
            <section className="col-span-1 bg-academia-paper p-6 border border-academia-leather shadow-sm">
              <h3 className="text-xl font-serif mb-4">Most Recent</h3>
              {recentPlanner ? (
                <div className="flex flex-col space-y-4">
                  <div className="p-4 bg-academia-parchment border border-academia-leather">
                    <h4 className="text-lg font-serif">{recentPlanner.title}</h4>
                    <p className="text-xs text-academia-inkLight">{recentPlanner.is_template ? 'Template' : 'Draft'}</p>
                  </div>
                  <div className="flex space-x-3">
                    <button onClick={() => navigate(`/editor/${recentPlanner.id}`)} className="px-4 py-2 bg-academia-leather text-academia-paper rounded-sm">Open</button>
                    <button onClick={async () => {
                      if (!window.confirm('Delete this draft?')) return;
                      try {
                        await plannerApi.delete(recentPlanner.id);
                        setPlanners((prev) => prev.filter(p => p.id !== recentPlanner.id));
                      } catch (err) {
                        console.error('Failed to delete planner:', err);
                        alert('Unable to delete draft.');
                      }
                    }} className="px-4 py-2 border border-red-400 text-red-600 rounded-sm">Delete</button>
                  </div>
                </div>
              ) : (
                <p className="text-academia-inkLight italic">No recent files yet.</p>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;