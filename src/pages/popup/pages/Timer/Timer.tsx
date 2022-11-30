import { useBlocksApi } from '@src/services/blocks/useBlocksApi';
import { useSessionsApi } from '@src/services/sessions/useSessionsApi';
import { useTime } from '@src/services/time/useTime';
import { useTimersApi } from '@src/services/timers/useTimersApi';
import { useState } from 'react';
import style from './Timer.module.scss';

export function Timer() {
  const { procrastinationExpiresIn } = useTime();
  const { fetchLatest } = useBlocksApi();
  const { changeStatusToFocusing } = useSessionsApi();
  const { fetchTimerDuration } = useTimersApi();
  let blockDateTimeValue = '0';

  const [timer, setTimer] = useState('00:00:00');

  let interval = null;

  fetchLatest().then(({ blockDateTime }) => {
    blockDateTimeValue = blockDateTime;
  });

  interval = setInterval(async () => await updateProcrastinationTimer(), 1000);

  const updateProcrastinationTimer = async () => {
    const response = await fetchTimerDuration();
    const timeDuration = response.time;

    const timeToExpire = await procrastinationExpiresIn(
      blockDateTimeValue,
      timeDuration
    );
    if (timer.includes('-')) {
      clearInterval(interval);
      setTimer('00:00:00');
      changeStatusToFocusing().then(() => {
        location.reload();
      });
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
