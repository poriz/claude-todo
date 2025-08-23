import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TodoPage } from './pages/TodoPage';
import { AuthPage } from './pages/AuthPage';
import { Header } from './components/features/Header';
// import { TestAnimation } from './components/animations/TestAnimation';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-4">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">🚧 Phase 3-1단계: 애니메이션 인프라 구축 완료</p>
          <p className="text-sm">애니메이션 컴포넌트가 생성되었습니다. 곧 통합될 예정입니다.</p>
        </div>
        {/* <TestAnimation /> */}
      </div>
      <TodoPage />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
