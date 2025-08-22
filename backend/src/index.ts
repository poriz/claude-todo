import express from 'express';
import cors from 'cors';
import apiRoutes from './routes.js';

const app = express();
const PORT = 3001;

// 미들웨어 설정
app.use(cors({
  origin: 'http://localhost:5173', // 프론트엔드 개발 서버
  credentials: true
}));
app.use(express.json());

// API 라우터 연결
app.use('/api', apiRoutes);

// 기본 라우터
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running!' });
});

// 404 핸들러
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📝 Todos API: http://localhost:${PORT}/api/todos`);
  console.log(`🏷️ Categories API: http://localhost:${PORT}/api/categories`);
});

export default app;