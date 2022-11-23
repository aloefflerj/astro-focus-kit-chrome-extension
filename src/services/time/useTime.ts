import moment from 'moment';

export const useTime = () => ({
  hasPassedXMinutesSinceDate: (date: string, minutes: number): boolean => {
    return moment().isAfter(moment(date).add(minutes, 'minutes'));
  },
});
