import { ReactNode } from "react"
import styles from './accordeon.module.scss';

type AccordeonProps = {
  head: ReactNode;
  content?: ReactNode | Element[];
  open: boolean;
  onToggle: (value: boolean) => void;
}

export const Accordeon = ({ head, content, open, onToggle }: AccordeonProps) => (
  <>
    <div className={styles.head} onClick={() => { onToggle(!open) }} role="presentation">
      {head}
    </div>
    {open && content}
  </>
)