import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { openDb, readSqlFile, run, get } from './db.js';
import { uid } from './utils.js';

const dbPath = process.env.DB_PATH || './db/taskflow.sqlite';
const initSqlPath = path.resolve('./init.sql');

async function seed() {
    console.log('🔄 Resetting database...');

    // 1. Delete DB file if exists
    if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath);
        console.log('🗑️  Old DB deleted.');
    }

    // 2. Initialize DB
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    const db = openDb(dbPath);

    try {
        const sql = readSqlFile(initSqlPath);
        await new Promise((resolve, reject) => {
            db.exec(sql, (err) => (err ? reject(err) : resolve()));
        });
        console.log('✅ DB Initialized.');

        // 3. Create Demo User
        const userId = 'u_demo2026';
        const hash = await bcrypt.hash('1234', 10);
        await run(db, 'INSERT INTO users(id,email,password_hash,name) VALUES (?,?,?,?)', [userId, 'demo@test.com', hash, '김철수']);
        console.log('👤 User created: demo@test.com / 1234');

        // 4. Create Workspace
        const wsId = uid('w');
        await run(db, 'INSERT INTO workspaces(id,name) VALUES (?,?)', [wsId, '2026 신년 프로젝트']);
        await run(db, 'INSERT INTO memberships(id,workspace_id,user_id,role) VALUES (?,?,?,?)', [uid('m'), wsId, userId, 'owner']);

        // 5. Create Project
        const projId = uid('p');
        await run(db, 'INSERT INTO projects(id,workspace_id,name,description,created_by) VALUES (?,?,?,?,?)',
            [projId, wsId, '1월 웹사이트 개편', '2026년 1월 한달간 진행되는 웹사이트 리뉴얼 프로젝트', userId]
        );

        // 6. Create Columns
        const cols = [
            { id: uid('c'), name: '기획', ord: 1 },
            { id: uid('c'), name: '디자인', ord: 2 },
            { id: uid('c'), name: '개발', ord: 3 },
            { id: uid('c'), name: '배포', ord: 4 },
        ];
        for (const c of cols) {
            await run(db, 'INSERT INTO columns(id,project_id,name,ord) VALUES (?,?,?,?)', [c.id, projId, c.name, c.ord]);
        }

        // 7. Create Tasks (Jan 2026)
        const tasks = [
            // Week 1: Planning
            { title: '요구사항 분석', col: 0, start: '2026-01-02', end: '2026-01-05', priority: 'high' },
            { title: '경쟁사 분석', col: 0, start: '2026-01-03', end: '2026-01-06', priority: 'medium' },
            { title: '기획안 초안 작성', col: 0, start: '2026-01-05', end: '2026-01-08', priority: 'high' },

            // Week 2: Design
            { title: '메인 페이지 시안', col: 1, start: '2026-01-08', end: '2026-01-12', priority: 'high' },
            { title: '아이콘/에셋 디자인', col: 1, start: '2026-01-10', end: '2026-01-13', priority: 'low' },
            { title: '모바일 뷰 디자인', col: 1, start: '2026-01-12', end: '2026-01-15', priority: 'medium' },

            // Week 3: Development
            { title: '프론트엔드 환경구축', col: 2, start: '2026-01-15', end: '2026-01-16', priority: 'high' },
            { title: '메인 페이지 퍼블리싱', col: 2, start: '2026-01-16', end: '2026-01-20', priority: 'medium' },
            { title: 'API 연동', col: 2, start: '2026-01-19', end: '2026-01-23', priority: 'high' },

            // Week 4: Testing & Deploy
            { title: 'QA 및 버그수정', col: 2, start: '2026-01-26', end: '2026-01-29', priority: 'medium' },
            { title: '최종 배포', col: 3, start: '2026-01-30', end: '2026-01-31', priority: 'high' },
        ];

        let ordMap = {};
        for (const t of tasks) {
            const col = cols[t.col];
            if (!ordMap[col.id]) ordMap[col.id] = 1;

            await run(db, `
              INSERT INTO tasks(id, project_id, column_id, title, description, start_date, end_date, priority, status, ord, created_by)
              VALUES (?,?,?,?,?,?,?,?,?,?,?)
            `, [uid('t'), projId, col.id, t.title, '샘플 태스크 설명입니다.', t.start, t.end, t.priority, t.col === 3 ? 'closed' : 'open', ordMap[col.id]++, userId]);
        }

        console.log(`✅ Seeded ${tasks.length} tasks for Jan 2026.`);

    } catch (e) {
        console.error('❌ Seeding failed:', e);
    } finally {
        db.close();
    }
}

seed();
