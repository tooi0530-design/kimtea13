import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
  date: string;
  setDate: (date: string) => void;
  onOpenCalendar: () => void;
}

const Header: React.FC<HeaderProps> = ({ date, setDate, onOpenCalendar }) => {
  const currentDate = new Date(date);
  
  const handlePrevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    setDate(prev.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    setDate(next.toISOString().split('T')[0]);
  };

  // Korean Date Formatting
  const formattedDate = currentDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', year: 'numeric' });

  // Korean Weekdays
  const weekdays = ['월', '화', '수', '목', '금', '토', '일'];
  const currentDayIndex = (currentDate.getDay() + 6) % 7; // Mon=0, Sun=6

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b-2 border-gray-800 pb-4">
      <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto justify-between md:justify-start">
        <h1 className="text-4xl font-bold text-gray-800 serif">일일 플래너</h1>
      </div>

      <div className="flex flex-col items-center md:items-end gap-2">
        <div className="flex items-center gap-4">
            <button onClick={handlePrevDay} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <ChevronLeft size={20} />
            </button>
            <div 
                className="flex items-center gap-2 cursor-pointer hover:text-gray-600"
                onClick={onOpenCalendar}
            >
                <span className="text-gray-500 italic text-lg serif">날짜</span>
                <span className="text-xl border-b border-gray-400 min-w-[150px] text-center pb-1 font-medium">
                    {formattedDate}
                </span>
                <CalendarIcon size={16} className="text-gray-400" />
            </div>
            <button onClick={handleNextDay} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <ChevronRight size={20} />
            </button>
        </div>
        
        <div className="flex gap-2 mt-2">
          {weekdays.map((d, i) => (
            <span 
              key={i} 
              className={`text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                i === currentDayIndex ? 'text-rose-500 bg-rose-50' : 'text-gray-300'
              }`}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;