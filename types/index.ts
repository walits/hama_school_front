export interface School {
  id: number;
  name: string;
  userCount?: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  schoolId: number;
  school?: School;
  createdAt: string;
}

export interface Question {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface Progress {
  id: number;
  userId: number;
  questionId: number;
  isCompleted: boolean;
  createdAt: string;
  user?: User;
  question?: Question;
}

export interface DashboardStats {
  totalUsers: number;
  totalSchools: number;
  totalQuestions: number;
  todayProgress: number;
  schoolStats: SchoolStats[];
  dailyProgress: DailyProgress[];
}

export interface SchoolStats {
  schoolId: number;
  schoolName: string;
  userCount: number;
  progressCount: number;
}

export interface DailyProgress {
  date: string;
  count: number;
}
