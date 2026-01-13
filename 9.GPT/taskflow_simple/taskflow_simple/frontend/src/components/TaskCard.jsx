import { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { format } from 'date-fns';

export function TaskCard({ task, index, onMove, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDesc, setEditDesc] = useState(task.description || '');
    const [editStart, setEditStart] = useState(task.startDate || '');
    const [editEnd, setEditEnd] = useState(task.endDate || '');

    const handleSave = () => {
        onUpdate(task.id, {
            title: editTitle,
            description: editDesc,
            startDate: editStart,
            endDate: editEnd
        });
        setIsEditing(false);
    };

    const formatDate = (d) => {
        if (!d) return '';
        try {
            return format(new Date(d), 'MM/dd');
        } catch { return d; }
    };

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`card group relative border-l-4 ${snapshot.isDragging ? 'shadow-2xl ring-2 ring-pastel-primary z-50 bg-white' : 'hover:-translate-y-1 hover:shadow-lg transition-all duration-200'}`}
                    style={{
                        ...provided.draggableProps.style,
                        borderLeftColor: task.priority === 'high' ? '#fca5a5' : task.priority === 'low' ? '#86efac' : '#cbd5e1'
                    }}
                >
                    {isEditing ? (
                        <div className="space-y-2">
                            <input className="input text-sm font-bold" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                            <textarea className="input text-sm resize-none" rows={2} value={editDesc} onChange={e => setEditDesc(e.target.value)} placeholder="설명" />
                            <div className="grid grid-cols-2 gap-2">
                                <input type="date" className="input text-xs p-1" value={editStart} onChange={e => setEditStart(e.target.value)} />
                                <input type="date" className="input text-xs p-1" value={editEnd} onChange={e => setEditEnd(e.target.value)} />
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                                <button className="btn ghost text-xs py-1 px-2" onClick={() => setIsEditing(false)}>취소</button>
                                <button className="btn primary text-xs py-1 px-2" onClick={handleSave}>저장</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div
                                {...provided.dragHandleProps}
                                className="flex justify-between items-start mb-1 p-2 -m-2 cursor-grab active:cursor-grabbing hover:bg-gray-50/50 rounded"
                                title="드래그하려면 여기를 잡으세요"
                            >
                                <h4 className="font-bold text-gray-800 break-words w-full pointer-events-none">{task.title}</h4>
                                <button
                                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-pastel-accent transition-opacity ml-2 pointer-events-auto"
                                    onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                                    title="수정"
                                >
                                    ✎
                                </button>
                            </div>
                            {task.description && <p className="text-sm text-gray-600 mb-2 line-clamp-2">{task.description}</p>}

                            <div className="flex items-center justify-between mt-2">
                                {(task.startDate || task.endDate) && (
                                    <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                        📅 {formatDate(task.startDate)} - {formatDate(task.endDate)}
                                    </div>
                                )}
                                <button
                                    className="opacity-0 group-hover:opacity-100 text-xs text-red-400 hover:text-red-600 transition-opacity ml-auto"
                                    onClick={() => onDelete(task.id)}
                                >
                                    삭제
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </Draggable>
    );
}
