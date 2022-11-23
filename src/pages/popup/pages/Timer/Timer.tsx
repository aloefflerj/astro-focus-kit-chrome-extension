import { useBlocksApi } from '@src/services/blocks/useBlocksApi';
import { useTime } from '@src/services/time/useTime';
import { useEffect, useState } from 'react';

export function Timer() {
  const { procrastinationExpiresIn } = useTime();
  const { fetchLatest } = useBlocksApi();

  const [blockDateTime, setBlockDateTime] = useState<string>('');
  const [timer, setTimer] = useState('00:00:00');

  setInterval(() => updateProcrastinationTimer(), 1000);

  useEffect(() => {
    fetchLatest().then(({ blockDateTime }) => setBlockDateTime(blockDateTime));
  }, ['latestBlock']);

  const updateProcrastinationTimer = () => {
    const timeToExpire = procrastinationExpiresIn(blockDateTime, 1);
    setTimer(timeToExpire);
  };

  return <h1>{timer}</h1>;
}
