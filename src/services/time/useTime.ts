import moment from 'moment';

export const useTime = () => ({
  hasPassedXMinutesSinceDate: (dateTime: string, minutes: number): boolean => {
    return moment().isAfter(moment(dateTime).add(minutes, 'minutes'));
  },
  procrastinationExpiresIn: async (
    lastBlockTime: string,
    expiresInXMinutes: number
  ): Promise<string> => {
    const duration = moment.duration(
      moment(lastBlockTime).add(expiresInXMinutes, 'minutes').diff(moment())
    );

    return (
      duration.hours() + ':' + duration.minutes() + ':' + duration.seconds()
    );
  },
});
