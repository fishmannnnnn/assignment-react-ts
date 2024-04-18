import styles from './Main.module.css';
import MainForm from './MainForm';
const Main = () => {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.avatar}>АИ</div>
            <div className={styles.user}>
                <div className={styles.userName}>Алексей Иванов</div>
                <div className={styles.userBio}>
                    <ul className={styles.bioList}>
                        <li><a className={styles.bioLink} href="https://www.telegram.org/">Telegram</a></li>
                        <li><a className={styles.bioLink} href="https://www.telegram.org/">GitHub</a></li>
                        <li><a className={styles.bioLink} href="https://www.telegram.org/">Резюме</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <svg width="852" height="2" viewBox="0 0 852 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1L852 1" stroke="black" stroke-opacity="0.08" />
        </svg>
        <MainForm/>
    </div>
  )
}

export default Main