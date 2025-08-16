export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
};

export const formatRelativeDate = (date: Date) => {
  const now = new Date();
  const target = new Date(date);
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const overdueDays = Math.abs(diffDays);
    return {
      label: `${overdueDays}일 지남`,
      type: 'overdue' as const,
      urgency: 'high' as const,
      color: 'bg-red-100 text-red-700 border-red-200'
    };
  } else if (diffDays === 0) {
    return {
      label: '오늘',
      type: 'today' as const,
      urgency: 'high' as const,
      color: 'bg-orange-100 text-orange-700 border-orange-200'
    };
  } else if (diffDays === 1) {
    return {
      label: '내일',
      type: 'tomorrow' as const,
      urgency: 'medium' as const,
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    };
  } else if (diffDays <= 7) {
    return {
      label: `${diffDays}일 후`,
      type: 'thisWeek' as const,
      urgency: 'medium' as const,
      color: 'bg-blue-100 text-blue-700 border-blue-200'
    };
  } else if (diffDays <= 30) {
    return {
      label: `${diffDays}일 후`,
      type: 'thisMonth' as const,
      urgency: 'low' as const,
      color: 'bg-gray-100 text-gray-700 border-gray-200'
    };
  } else {
    return {
      label: `${diffDays}일 후`,
      type: 'future' as const,
      urgency: 'low' as const,
      color: 'bg-gray-100 text-gray-700 border-gray-200'
    };
  }
};

export const getDueDateCategory = (date: Date | undefined) => {
  if (!date) return null;
  
  const now = new Date();
  const target = new Date(date);
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'overdue';
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'tomorrow';
  if (diffDays <= 7) return 'thisWeek';
  if (diffDays <= 30) return 'thisMonth';
  return 'future';
};

export const sortTodosByPriorityAndDate = (todos: any[]) => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  
  return [...todos].sort((a, b) => {
    // 1. 완료 상태로 먼저 분류 (미완료가 위로)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // 2. 마감일이 지났거나 오늘인 것들을 우선
    const aDateInfo = a.dueDate ? formatRelativeDate(a.dueDate) : null;
    const bDateInfo = b.dueDate ? formatRelativeDate(b.dueDate) : null;
    
    const aIsUrgent = aDateInfo && (aDateInfo.type === 'overdue' || aDateInfo.type === 'today');
    const bIsUrgent = bDateInfo && (bDateInfo.type === 'overdue' || bDateInfo.type === 'today');
    
    if (aIsUrgent !== bIsUrgent) {
      return aIsUrgent ? -1 : 1;
    }

    // 3. 우선순위로 정렬
    const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
    const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }

    // 4. 마감일로 정렬 (가까운 순)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;

    // 5. 생성일로 정렬 (최신순)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};