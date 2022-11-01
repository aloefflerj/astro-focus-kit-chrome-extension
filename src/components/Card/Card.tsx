import style from './Card.module.scss';

interface Props {
  children: React.ReactNode;
  type:
    | 'logo'
    | 'planetOption'
    | 'option'
    | 'smallOption'
    | 'dayHeader'
    | 'task'
    | 'logoLogin';
  done?: boolean;
}

export function Card({ children, type, done }: Props) {
  return (
    <div className={`${style.card} ${style[type]} ${done ? 'done' : ''}`}>
      <span className={`${style.cardTop} ${style[type]}`}>{children}</span>
    </div>
  );
}
