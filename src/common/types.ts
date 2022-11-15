export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
}

export interface ITask {
  id: string;
  order: number;
  title: string;
  type: 'binary' | 'timer' | 'pomodoro';
  status: 'onCourse' | 'done' | 'todo';
  urgent: boolean;
  important: boolean;
  description?: string;
  registerDate: string;
  conclusionDate?: string;
  deleted: boolean;
}
