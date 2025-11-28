import React, { useState } from 'react';
import { Sparkles, X, Loader2 } from 'lucide-react';

interface AIModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (input: string) => Promise<void>;
    loading: boolean;
}

const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose, onGenerate, loading }) => {
    const [input, setInput] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!input.trim()) return;
        await onGenerate(input);
        setInput(''); // Clear after success
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400"></div>

                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 text-gray-800">
                        <Sparkles className="text-rose-500" size={20} />
                        <h2 className="text-xl font-bold serif">AI 비서</h2>
                    </div>
                    <button onClick={onClose} disabled={loading} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                   오늘 해야 할 일들을 알려주세요. 제가 일정과 우선순위를 정리해 드릴게요.
                </p>

                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="예: 오후 2시에 회의가 있고, 장도 봐야 해. 아침에는 운동하고 5시까지 보고서를 끝내야 해."
                    className="w-full h-32 bg-gray-50 rounded-lg p-3 text-sm text-gray-800 focus:ring-2 focus:ring-rose-200 outline-none resize-none mb-4"
                />

                <div className="flex justify-end gap-3">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        disabled={loading}
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !input.trim()}
                        className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-black transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />}
                        일정 만들기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIModal;