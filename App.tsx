import React, { useState, useEffect } from 'react';
import Header from './components/Planner/Header';
import Schedule from './components/Planner/Schedule';
import TopPriorities from './components/Planner/TopPriorities';
import Habits from './components/Planner/Habits';
import Meals from './components/Planner/Meals';
import TodoList from './components/Planner/TodoList';
import Review from './components/Planner/Review';
import CalendarView from './components/Calendar/CalendarView';
import AIModal from './components/Planner/AIModal';
import { DailyPlannerData, INITIAL_DATA } from './types';
import { loadDay, saveDay, getStoredDates } from './services/storageService';
import { generatePlanFromInput, reviewDayWithAI } from './services/geminiService';
import { Sparkles, MessageSquareQuote } from 'lucide-react';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState<DailyPlannerData>({ ...INITIAL_DATA, date: currentDate });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const [storedDates, setStoredDates] = useState<string[]>([]);
  const [aiReview, setAiReview] = useState<string | null>(null);

  useEffect(() => {
    // Load data whenever date changes
    const loadedData = loadDay(currentDate);
    setData(loadedData);
    setStoredDates(getStoredDates());
    setAiReview(null); // Reset review
  }, [currentDate]);

  useEffect(() => {
    // Auto-save on data change (debounced could be better, but simple direct save is fine for local)
    if (data.date) {
        saveDay(data);
        setStoredDates(getStoredDates()); // Update available dates
    }
  }, [data]);

  const updateSchedule = (index: number, val: string) => {
    const newSchedule = [...data.schedule];
    newSchedule[index].task = val;
    setData({ ...data, schedule: newSchedule });
  };

  const updateTop3 = (id: string, text: string) => {
    setData({ ...data, top3: data.top3.map(t => t.id === id ? { ...t, text } : t) });
  };
  const toggleTop3 = (id: string) => {
    setData({ ...data, top3: data.top3.map(t => t.id === id ? { ...t, completed: !t.completed } : t) });
  };

  const updateTodo = (id: string, text: string) => {
    setData({ ...data, todos: data.todos.map(t => t.id === id ? { ...t, text } : t) });
  };
  const toggleTodo = (id: string) => {
    setData({ ...data, todos: data.todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t) });
  };

  const addHabit = (name: string) => {
    const newHabit = { id: Date.now().toString(), name, completed: false };
    setData({ ...data, habits: [...data.habits, newHabit] });
  };
  const removeHabit = (id: string) => {
    setData({ ...data, habits: data.habits.filter(h => h.id !== id) });
  };
  const toggleHabit = (id: string) => {
    setData({ ...data, habits: data.habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h) });
  };

  const updateMeals = (field: keyof typeof data.meals, value: string | number) => {
    setData({ ...data, meals: { ...data.meals, [field]: value } });
  };

  const updateReview = (field: keyof typeof data.review, value: string | number) => {
    setData({ ...data, review: { ...data.review, [field]: value } });
  };

  const handleAIPlan = async (input: string) => {
    setIsAILoading(true);
    const updates = await generatePlanFromInput(currentDate, data, input);
    if (updates) {
        setData(prev => ({ ...prev, ...updates }));
        setIsAIModalOpen(false);
    } else {
        alert("일정을 생성할 수 없습니다. API 키를 확인하거나 다시 시도해 주세요.");
    }
    setIsAILoading(false);
  };

  const handleAIReview = async () => {
      setIsAILoading(true);
      const review = await reviewDayWithAI(data);
      setAiReview(review);
      setIsAILoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-gray-800 p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-sm p-8 md:p-12 relative min-h-[90vh]">
        
        {/* Paper texture overlay (subtle noise) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        <Header 
            date={currentDate} 
            setDate={setCurrentDate} 
            onOpenCalendar={() => setIsCalendarOpen(true)}
        />

        {aiReview && (
            <div className="mb-8 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-blue-100 flex gap-4 items-start animate-fade-in relative group">
                <div className="bg-white p-2 rounded-full shadow-sm">
                    <Sparkles size={20} className="text-blue-500" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-blue-900 serif mb-1">오늘의 조언</h3>
                    <p className="text-blue-800 text-sm leading-relaxed">{aiReview}</p>
                </div>
                <button onClick={() => setAiReview(null)} className="text-blue-300 hover:text-blue-500"><X size={16} /></button>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
          
          {/* Left Column: Schedule (30%) */}
          <div className="md:col-span-4 lg:col-span-3 border-r-0 md:border-r border-gray-200 md:pr-8">
            <Schedule schedule={data.schedule} onChange={updateSchedule} />
          </div>

          {/* Middle Column: Top 3, Habits, Meals (35%) */}
          <div className="md:col-span-4 lg:col-span-4">
             <TopPriorities items={data.top3} onChange={updateTop3} onToggle={toggleTop3} />
             <Habits habits={data.habits} onToggle={toggleHabit} onAdd={addHabit} onRemove={removeHabit} />
             <Meals meals={data.meals} onChange={updateMeals} />
          </div>

          {/* Right Column: Todo, Review (35%) */}
          <div className="md:col-span-4 lg:col-span-5 md:pl-4 flex flex-col h-full">
            <div className="flex-1 mb-6">
                <TodoList todos={data.todos} onChange={updateTodo} onToggle={toggleTodo} />
            </div>
            <div className="flex-1">
                 <Review 
                    data={data.review} 
                    notes={data.notes} 
                    tomorrow={data.tomorrow}
                    onChangeReview={updateReview}
                    onChangeNotes={(val) => setData({ ...data, notes: val })}
                    onChangeTomorrow={(val) => setData({ ...data, tomorrow: val })}
                 />
            </div>
          </div>
        </div>

        {/* Calendar Modal */}
        {isCalendarOpen && (
            <CalendarView 
                currentDate={currentDate} 
                onSelectDate={(d) => { setCurrentDate(d); setIsCalendarOpen(false); }}
                onClose={() => setIsCalendarOpen(false)}
                storedDates={storedDates}
            />
        )}

        {/* AI Planner Modal */}
        <AIModal 
            isOpen={isAIModalOpen}
            onClose={() => setIsAIModalOpen(false)}
            onGenerate={handleAIPlan}
            loading={isAILoading}
        />
        
      </div>
    </div>
  );
};

// Simple Icon component for close inside Review if needed, reused form Lucide
const X = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export default App;