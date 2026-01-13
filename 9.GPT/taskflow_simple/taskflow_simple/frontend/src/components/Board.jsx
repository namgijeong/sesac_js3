import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { api } from '../api';
import { TaskCard } from './TaskCard';

export function Board({ projectId, onBack }) {
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newTitles, setNewTitles] = useState({});

    async function load() {
        setLoading(true);
        try {
            const data = await api.board(projectId);
            // Sort tasks by ord ensuring they are correct
            if (data.tasksByColumn) {
                Object.keys(data.tasksByColumn).forEach(key => {
                    data.tasksByColumn[key].sort((a, b) => a.ord - b.ord);
                });
            }
            setBoard(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, [projectId]);

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        // Optimistic update
        const sourceColId = source.droppableId;
        const destColId = destination.droppableId;

        const newBoard = { ...board };
        const sourceTasks = Array.from(newBoard.tasksByColumn[sourceColId] || []);
        const [movedTask] = sourceTasks.splice(source.index, 1);

        // If moving to same column
        if (sourceColId === destColId) {
            sourceTasks.splice(destination.index, 0, movedTask);
            newBoard.tasksByColumn[sourceColId] = sourceTasks;
        } else {
            // Different column
            const destTasks = Array.from(newBoard.tasksByColumn[destColId] || []);
            movedTask.columnId = destColId; // Update local state immediately
            destTasks.splice(destination.index, 0, movedTask);
            newBoard.tasksByColumn[sourceColId] = sourceTasks;
            newBoard.tasksByColumn[destColId] = destTasks;
        }

        setBoard(newBoard);

        // API call: The backend expects toOrder as 1-indexed.
        // In our list, index is 0-indexed. So toOrder = destination.index + 1
        await api.moveTask(draggableId, {
            toColumnId: destColId,
            toOrder: destination.index + 1
        });
        // Reload to confirm sync
        // load(); // Optional: might cause jump if backend logic differs slightly, but safe for consistency
    };

    const addTask = async (colId) => {
        const title = (newTitles[colId] || '').trim();
        if (!title) return;
        await api.createTask(colId, { title });
        setNewTitles(prev => ({ ...prev, [colId]: '' }));
        load();
    };

    const updateTask = async (taskId, updates) => {
        await api.updateTask(taskId, updates); // We need to add this to api.js
        load();
    };

    const deleteTask = async (taskId) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        await api.deleteTask(taskId);
        load();
    };

    if (loading && !board) return <div className="p-8 text-center text-pastel-muted">로딩 중...</div>;
    if (!board) return null;

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pastel-text to-pastel-muted">
                    {board.columns[0]?.name ? 'Kanban Board' : 'Project Board'}
                </h2>
                <button onClick={onBack} className="btn ghost">← 프로젝트 목록</button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-6 overflow-x-auto pb-4 h-full items-start">
                    {board.columns.map(col => (
                        <div key={col.id} className="w-80 flex-shrink-0 flex flex-col max-h-full">
                            <div className="bg-pastel-secondary/50 rounded-xl p-4 flex flex-col max-h-full shadow-inner border border-white/50 backdrop-blur-sm">
                                <h3 className="font-bold text-gray-700 mb-3 flex justify-between items-center">
                                    {col.name}
                                    <span className="bg-white px-2 py-0.5 rounded-full text-xs text-gray-400 border shadow-sm">
                                        {(board.tasksByColumn[col.id] || []).length}
                                    </span>
                                </h3>

                                <Droppable droppableId={col.id}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={`flex flex-col gap-3 flex-1 overflow-y-auto min-h-[100px] p-1 transition-colors rounded-lg ${snapshot.isDraggingOver ? 'bg-pastel-blue/20' : ''}`}
                                        >
                                            {(board.tasksByColumn[col.id] || []).map((task, index) => (
                                                <TaskCard
                                                    key={task.id}
                                                    task={task}
                                                    index={index}
                                                    onMove={() => { }}
                                                    onDelete={deleteTask}
                                                    onUpdate={updateTask}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

                                <div className="mt-3 pt-3 border-t border-gray-200/50">
                                    <div className="flex gap-2">
                                        <input
                                            className="input text-sm"
                                            placeholder="+ 태스크 추가"
                                            value={newTitles[col.id] || ''}
                                            onChange={e => setNewTitles(p => ({ ...p, [col.id]: e.target.value }))}
                                            onKeyDown={e => e.key === 'Enter' && addTask(col.id)}
                                        />
                                        <button className="btn primary px-3" onClick={() => addTask(col.id)}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}
