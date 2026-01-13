import { useState, useEffect, useMemo } from 'react';
import { api } from '../api';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isSameDay, isWithinInterval, parseISO, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';

export function Gantt({ projectId, onBack }) {
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1)); // Default Jan 2026 as requested

    async function load() {
        setLoading(true);
        try {
            const data = await api.board(projectId);
            setBoard(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, [projectId]);

    const days = useMemo(() => {
        return eachDayOfInterval({
            start: startOfMonth(currentMonth),
            end: endOfMonth(currentMonth)
        });
    }, [currentMonth]);

    const tasks = useMemo(() => {
        if (!board) return [];
        // Flatten tasks
        return Object.values(board.tasksByColumn).flat().sort((a, b) => {
            // Sort by start date, then title
            if (a.startDate && b.startDate) return new Date(a.startDate) - new Date(b.startDate);
            if (a.startDate) return -1;
            if (b.startDate) return 1;
            return 0;
        });
    }, [board]);

    const getTaskStyle = (task) => {
        if (!task.startDate || !task.endDate) return null;
        const start = parseISO(task.startDate);
        const end = parseISO(task.endDate);
        if (!isValid(start) || !isValid(end)) return null;

        // Determine span within current month
        // This is a simple table implementation, checking each cell
        // style optimization is tricky with pure table cells, but we can do cell coloring
        return { start, end };
    };

    if (loading) return <div className="p-8 text-center text-pastel-muted">로딩 중...</div>;
    if (!board) return null;

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pastel-text to-pastel-muted">
                    Gantt Chart <span className="text-lg text-gray-400 font-normal">({format(currentMonth, 'yyyy년 M월', { locale: ko })})</span>
                </h2>
                <div className="flex gap-2">
                    {/* Simple month navigation could go here */}
                    <button onClick={onBack} className="btn ghost">← 프로젝트 목록</button>
                </div>
            </div>

            <div className="card overflow-hidden flex-1 flex flex-col p-0">
                <div className="overflow-auto gantt-scroll flex-1">
                    <table className="w-full border-collapse text-sm">
                        <thead className="bg-pastel-secondary sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="p-3 text-left w-64 min-w-[200px] border-b border-r bg-pastel-secondary font-bold text-gray-600">Task</th>
                                {days.map(day => (
                                    <th key={day.toString()} className={`p-1 w-8 min-w-[32px] text-center border-b border-gray-100 font-normal ${day.getDay() === 0 ? 'text-red-400' : day.getDay() === 6 ? 'text-blue-400' : 'text-gray-500'}`}>
                                        <div className="text-xs">{format(day, 'd')}</div>
                                        <div className="text-[10px]">{format(day, 'EEE', { locale: ko })}</div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => {
                                const range = getTaskStyle(task);
                                return (
                                    <tr key={task.id} className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                                        <td className="p-3 border-r font-medium text-gray-700 truncate max-w-[200px]" title={task.title}>
                                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${task.status === 'closed' ? 'bg-green-400' : 'bg-blue-400'}`}></span>
                                            {task.title}
                                        </td>
                                        {days.map(day => {
                                            let isWithin = false;
                                            let isStart = false;
                                            let isEnd = false;
                                            if (range) {
                                                isWithin = isWithinInterval(day, { start: range.start, end: range.end });
                                                isStart = isSameDay(day, range.start);
                                                isEnd = isSameDay(day, range.end);
                                            }

                                            let cellClass = 'border-r border-dashed border-gray-100 relative p-0 ';
                                            if (isWithin) {
                                                cellClass += 'bg-pastel-blue/30 ';
                                                // Use a div inside for better control
                                            }

                                            return (
                                                <td key={day.toString()} className={cellClass}>
                                                    {isWithin && (
                                                        <div className={`h-4 mx-0 rounded-sm ${isStart ? 'ml-1 rounded-l-md' : ''} ${isEnd ? 'mr-1 rounded-r-md' : ''} ${task.priority === 'high' ? 'bg-red-300' : task.status === 'closed' ? 'bg-green-300' : 'bg-blue-300'} opacity-80 hover:opacity-100 transition-opacity`}></div>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                            {tasks.length === 0 && (
                                <tr>
                                    <td colSpan={days.length + 1} className="p-8 text-center text-muted">표시할 일정이 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
