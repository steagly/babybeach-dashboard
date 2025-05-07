import styles from './DatePicker.module.css';

export default function EmptyDays({ count }: { count: number }) {
  console.log(count);

  return Array.from({ length: count }).map((_, i) => (
    <div key={`empty_${i}`} className="calendar-day empty"></div>
  ));
}
