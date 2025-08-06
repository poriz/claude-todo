import { Button, Card, CardHeader, CardTitle, CardContent } from './components/ui';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Todo App
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>프로젝트 설정 완료</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Vite + React + TypeScript + Tailwind CSS 기본 설정이 완료되었습니다.
              </p>
              <Button>시작하기</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>다음 단계</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-gray-600 space-y-2">
                <li>• 인증 시스템 구현</li>
                <li>• 할일 CRUD 기능</li>
                <li>• UI 컴포넌트 확장</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
