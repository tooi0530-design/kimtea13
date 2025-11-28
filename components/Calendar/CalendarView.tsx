import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CalendarViewProps {
  currentDate: string;
  onSelectDate: (date: string) => void;
  onClose: () => void;
  storedDates: string[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ currentDate, onSelectDate, onClose, storedDates }) => {
  const [viewDate, setViewDate] = React.useState(new Date(currentDate));

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const adjustedFirstDay = (firstDay + 6) % 7; // Mon start

  const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const generateDays = () => {
    const days = [];
    // Empty cells for days before start
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-14" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isSelected = dateStr === currentDate;
      const hasData = storedDates.includes(dateStr);
      const isToday = dateStr === new Date().toISOString().split('T')[0];

      days.push(
        <button
          key={day}
          onClick={() => onSelectDate(dateStr)}
          className={`h-14 relative rounded-lg flex flex-col items-center justify-center transition-all border
            ${isSelected ? 'bg-gray-800 text-white border-gray-800 shadow-md' : 'bg-white hover:bg-gray-50 border-gray-100'}
            ${isToday && !isSelected ? 'text-rose-500 font-bold border-rose-200' : ''}
          `}
        >
          <span className="text-lg">{day}</span>
          {hasData && !isSelected && (
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 absolute bottom-2"></span>
          )}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-fdfbf7 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative bg-[#fdfbf7]">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={24} />
        </button>
        
        <div className="flex items-center justify-between mb-8 px-4">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-200 rounded-full"><ChevronLeft /></button>
          <h2 className="text-2xl font-bold serif capitalize">
            {viewDate.toLocaleDateString('ko-KR', { month: 'long', year: 'numeric' })}
          </h2>
          <button onClick={handleNextMonth} className="p-2 hover:bg-gray-200 rounded-full"><ChevronRight /></button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2 text-center">
            {['월', '화', '수', '목', '금', '토', '일'].map(d => (
                <div key={d} className="text-xs font-bold text-gray-400 uppercase tracking-wider">{d}</div>
            ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
            {generateDays()}
        </div>
        
        <div className="mt-6 flex justify-center">
            <button 
                onClick={() => onSelectDate(new Date().toISOString().split('T')[0])}
                className="text-sm font-medium text-rose-500 hover:text-rose-600 underline"
            >
                오늘로 이동
            </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;