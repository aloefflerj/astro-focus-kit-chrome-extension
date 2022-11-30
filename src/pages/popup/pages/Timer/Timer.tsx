import { EnvironmentConfig } from '@src/config/environmentConfig';
import { useBlocksApi } from '@src/services/blocks/useBlocksApi';
import { useTime } from '@src/services/time/useTime';
import { useEffect, useState } from 'react';
import style from './Timer.module.scss';

export function Timer() {
  const defaultTimerDuration =
    EnvironmentConfig.defaultProcratinasionMinutesDuration;
  const { procrastinationExpiresIn, hasPassedXMinutesSinceDate } = useTime();
  const { fetchLatest } = useBlocksApi();

  const [blockDateTime, setBlockDateTime] = useState<string>('');
  const [timer, setTimer] = useState('00:00:00');

  let interval = null;

  interval = setInterval(async () => await updateProcrastinationTimer(), 1000);

  useEffect(() => {
    fetchLatest().then(({ blockDateTime }) => setBlockDateTime(blockDateTime));
  }, ['latestBlock']);

  const updateProcrastinationTimer = async () => {
    const timeToExpire = await procrastinationExpiresIn(
      blockDateTime,
      defaultTimerDuration
    );
    if (timer.includes('-')) {
      clearInterval(interval);
      setTimer('00:00:00');
      location.reload();
    }
    setTimer(timeToExpire);
  };

  return (
    <div className={style.timer}>
      <h2>Procrastination</h2>
      <h2>Timer</h2>
      <p>{timer}</p>
    </div>
  );
}
