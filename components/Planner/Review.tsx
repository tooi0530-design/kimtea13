import React from 'react';
import { ReviewData } from '../../types';
import { Star } from 'lucide-react';

interface ReviewProps {
    data: ReviewData;
    notes: string;
    tomorrow: string;
    onChangeReview: (field: keyof ReviewData, value: string | number) => void;
    onChangeNotes: (val: string) => void;
    onChangeTomorrow: (val: string) => void;
}

const Review: React.FC<ReviewProps> = ({ data, notes, tomorrow, onChangeReview, onChangeNotes, onChangeTomorrow }) => {
  return (
    <div className="flex flex-col gap-6 h-full">
       {/* Leave for tomorrow */}
       <div>
            <h2 className="text-lg font-bold text-gray-700 mb-2 serif">내일 할 일</h2>
            <textarea
                value={tomorrow}
                onChange={(e) => onChangeTomorrow(e.target.value)}
                className="w-full h-20 bg-transparent border-b border-gray-300 resize-none outline-none text-sm leading-6"
                style={{
                    backgroundImage: 'linear-gradient(transparent 95%, #e5e7eb 95%)',
                    backgroundSize: '100% 1.5rem',
                    lineHeight: '1.5rem'
                }}
            />
       </div>

       {/* Daily Review */}
       <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-bold text-gray-700 mb-4 serif">하루 회고</h2>
            
            <div className="mb-4">
                <label className="text-xs font-bold text-gray-400 block mb-1">오늘의 성취</label>
                <input 
                    type="text" 
                    value={data.achievement}
                    onChange={(e) => onChangeReview('achievement', e.target.value)}
                    className="w-full text-sm border-b border-gray-200 focus:border-gray-400 outline-none pb-1"
                />
            </div>

            <div className="mb-4">
                <label className="text-xs font-bold text-gray-400 block mb-1">아쉬웠던 점 / 개선할 점</label>
                <input 
                    type="text" 
                    value={data.improve}
                    onChange={(e) => onChangeReview('improve', e.target.value)}
                    className="w-full text-sm border-b border-gray-200 focus:border-gray-400 outline-none pb-1"
                />
            </div>

            <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">오늘의 점수</label>
                <div className="flex gap-1 justify-between">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button
                            key={num}
                            onClick={() => onChangeReview('rate', num)}
                            className={`w-6 h-6 rounded-full text-[10px] flex items-center justify-center border transition-colors ${
                                num <= data.rate 
                                ? 'bg-gray-800 text-white border-gray-800' 
                                : 'text-gray-400 border-gray-200 hover:border-gray-400'
                            }`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>
       </div>

       {/* Notes */}
       <div className="flex-1 min-h-[150px] bg-rose-50 rounded-lg p-4 flex flex-col">
            <h2 className="text-lg font-bold text-gray-700 mb-2 serif">메모</h2>
            <textarea
                value={notes}
                onChange={(e) => onChangeNotes(e.target.value)}
                className="flex-1 w-full bg-transparent border-none resize-none outline-none text-sm text-gray-700"
                placeholder="생각, 아이디어, 낙서..."
            />
       </div>
    </div>
  );
};

export default Review;