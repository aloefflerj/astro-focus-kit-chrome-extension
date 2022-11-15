import moment from 'moment';
import { ITask } from '../types';

export const getWeekTitleFromTaskDay = (task: ITask) => {
  const weekStart = moment(task.registerDate).startOf('week');
  const weekEnd = moment(task.registerDate).endOf('week');
  return `${weekStart.format('DD MMM')} » ${weekEnd.format('DD MMM')}`;
};
