import { useQuery } from '@tanstack/react-query';
import ProgressBar from '@ramonak/react-progress-bar';
import moment from 'moment';

import { ITask } from '@src/common/types';
import { Option } from '@src/components/Card/Option';
import { useTasksApi } from '@src/services/tasks/useTasksApi';
import { useEffect, useState } from 'react';
import style from './Home.module.scss';

export function Home(): JSX.Element {
  const { getTasks } = useTasksApi();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [tasksCompletionPercentage, setTasksCompletionPercentage] = useState(0);

  useEffect(() => {
    calcCompletionPercentage(tasks);
  });

  const onSuccess = (queriedTasks: ITask[]) => {
    setTasks(
      queriedTasks
        .map((task) => {
          task.registerDate = moment(task.registerDate).format('YYYY/MM/DD');
          return task;
        })
        .filter((task) => {
          return task.registerDate === moment().format('YYYY/MM/DD');
        })
    );
  };

  const { isFetching: isFetchingTasks } = useQuery<ITask[]>(
    ['tasks'],
    async () => getTasks(),
    { onSuccess, refetchOnWindowFocus: false }
  );

  const getFinishedTasksQty = (tasks: ITask[]): number =>
    tasks.filter((task) => {
      return task.status === 'done';
    }).length;

  const getUnfinishedTasksQty = (tasks: ITask[]): number =>
    tasks.filter((task) => {
      return task.status !== 'done';
    }).length;

  const calcCompletionPercentage = (tasks: ITask[]): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = getFinishedTasksQty(tasks) / tasks.length;
    setTasksCompletionPercentage(result.toFixed(2) * 100);
  };

  return isFetchingTasks ? (
    <p>Fetching...</p>
  ) : (
    <main className={style.home}>
      <h2>Daily Tasks</h2>
      <p>
        Finished:
        {getFinishedTasksQty(tasks)}
      </p>
      <p>
        Unfinished:
        {getUnfinishedTasksQty(tasks)}
      </p>
      <ProgressBar
        completed={tasksCompletionPercentage}
        className={style.progressBarWrapper}
        barContainerClassName={style.progressBarContainer}
        labelClassName={style.progressBarLabel}
        bgColor="#464651"
        labelAlignment="outside"
        animateOnRender={true}
        transitionDuration="0.4s"
      />
      <button>
        <Option type="small" title="TASKS" />
      </button>
      <button>
        <Option type="small" title="LOGOUT" />
      </button>
    </main>
  );
}
