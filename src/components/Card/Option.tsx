import { Card } from '../../components/Card/Card';

interface Props {
  title: string;
  type?: 'normal' | 'small';
}

export function Option({ title, type = 'normal' }: Props) {
  const selectedType = type === 'small' ? 'smallOption' : 'option';
  return <Card type={selectedType}>{title}</Card>;
}
