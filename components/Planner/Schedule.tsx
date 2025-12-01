import React from 'react';
import { ScheduleItem } from '../../types';

interface ScheduleProps {
  schedule: ScheduleItem[];
  onChange: (index: number, val: string) => void;
}

const Schedule: React.FC<ScheduleProps> = ({ schedule, onChange }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-700 mb-2 serif">오늘의 일정</h2>
      <div className="flex-1 border-t border-gray-300">
        {schedule.map((item, index) => {
          const isHalfHour = item.time.endsWith(':30');
          
          return (
            <div key={item.time} className="flex items-center border-b border-gray-200 h-8 group hover:bg-gray-50 transition-colors">
              <div className={`w-12 text-[10px] pt-1 text-right pr-2 select-none flex items-center justify-end h-full ${isHalfHour ? 'text-gray-400' : 'text-gray-600 font-bold font-mono'}`}>
                {isHalfHour ? '한일' : item.time}
              </div>
              <input
                type="text"
                value={item.task}
                onChange={(e) => onChange(index, e.target.value)}
                className={`flex-1 bg-transparent border-none outline-none text-sm h-full px-2 font-medium ${isHalfHour ? 'text-gray-600' : 'text-gray-800'}`}
                placeholder=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;