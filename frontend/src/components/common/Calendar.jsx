import React, { useState, useEffect } from 'react';

// Simple calendar with events/todos persisted to localStorage
const STORAGE_KEY = 'plancraft_calendar_v1';

const today = new Date();

const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
const formatDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { events: [], todos: [] };
  } catch (e) {
    return { events: [], todos: [] };
  }
};

const save = (state) => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

const Calendar = () => {
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(formatDate(new Date()));
  const [state, setState] = useState(load());
  const [title, setTitle] = useState('');
  const [itemType, setItemType] = useState('event');

  useEffect(() => { save(state); }, [state]);

  const startDay = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay();
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();

  const buildCalendarDays = () => {
    const days = [];
    // leading blanks
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    return days;
  };

  const days = buildCalendarDays();

  const itemsForDate = (date) => {
    return [
      ...(state.events || []).filter(e => e.date === date),
      ...(state.todos || []).filter(t => t.date === date),
    ];
  };

  const addItem = () => {
    if (!title.trim()) return;
    const newItem = { id: Date.now(), title: title.trim(), date: selected };
    if (itemType === 'event') setState(s => ({ ...s, events: [...s.events, newItem] }));
    else setState(s => ({ ...s, todos: [...s.todos, { ...newItem, done: false }] }));
    setTitle('');
  };

  const toggleTodo = (id) => {
    setState(s => ({ ...s, todos: s.todos.map(t => t.id === id ? { ...t, done: !t.done } : t) }));
  };

  const deleteItem = (id, type) => {
    if (type === 'event') setState(s => ({ ...s, events: s.events.filter(e => e.id !== id) }));
    else setState(s => ({ ...s, todos: s.todos.filter(t => t.id !== id) }));
  };

  const editItem = (id, type, newTitle) => {
    if (type === 'event') setState(s => ({ ...s, events: s.events.map(e => e.id === id ? { ...e, title: newTitle } : e) }));
    else setState(s => ({ ...s, todos: s.todos.map(t => t.id === id ? { ...t, title: newTitle } : t) }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-academia-paper p-4 border border-academia-leather shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-serif text-lg">Calendar — {cursor.toLocaleString(undefined, { month: 'long' })} {cursor.getFullYear()}</h4>
          <div className="space-x-2">
            <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} className="px-2 py-1">◀</button>
            <button onClick={() => setCursor(new Date())} className="px-2 py-1">Today</button>
            <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} className="px-2 py-1">▶</button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-xs">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (<div key={d} className="text-center font-semibold">{d}</div>))}
        </div>

        <div className="grid grid-cols-7 gap-1 mt-2">
          {days.map((d, i) => (
            <div key={i} onClick={() => d && setSelected(formatDate(d))} className={`min-h-[64px] p-2 border ${d ? 'cursor-pointer' : 'bg-transparent'} ${selected === (d ? formatDate(d) : '') ? 'bg-academia-leather/10' : ''}`}>
              {d ? (
                <div>
                  <div className="text-sm font-medium">{d.getDate()}</div>
                  <div className="mt-1 space-y-1">
                    {(itemsForDate(formatDate(d)) || []).slice(0,3).map(it => (
                      <div key={it.id} className="text-xs truncate">
                        - {it.title}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-academia-paper p-4 border border-academia-leather shadow-sm">
        <h4 className="font-serif text-lg mb-2">Items on {selected}</h4>
        <div className="mb-3 flex space-x-2">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event or todo title" className="flex-1 p-2 border" />
          <select value={itemType} onChange={(e) => setItemType(e.target.value)} className="p-2 border">
            <option value="event">Event</option>
            <option value="todo">To-Do</option>
          </select>
          <button onClick={addItem} className="px-3 py-2 bg-academia-leather text-academia-paper">Add</button>
        </div>

        <div className="space-y-3">
          {(itemsForDate(selected) || []).map(it => {
            const isTodo = state.todos.find(t => t.id === it.id);
            return (
              <div key={it.id} className="p-2 bg-academia-parchment border">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1 min-w-0">
                    <input
                      className="w-full bg-transparent min-w-0"
                      value={it.title}
                      onChange={(e)=> editItem(it.id, isTodo ? 'todo' : 'event', e.target.value)}
                    />
                    {isTodo && <div className="text-xs text-academia-inkLight">To-Do</div>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {isTodo && (
                      <button onClick={() => toggleTodo(it.id)} className="px-2 py-1 border whitespace-nowrap">{it.done ? 'Undo' : 'Done'}</button>
                    )}
                    <button onClick={() => deleteItem(it.id, isTodo ? 'todo' : 'event')} className="px-2 py-1 text-red-600 border whitespace-nowrap">Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
