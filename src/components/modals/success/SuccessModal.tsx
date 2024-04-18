import styles from '../Modal.module.css'
import svg from '../../../assets/modal/success.svg'
interface ModalProps {
  onClose: () => void; 
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>Форма успешно отправлена</p>

        <img className={styles.img} src={svg} alt="" />
        <button id='button-to-main' onClick={onClose} className={styles.button}>На главную</button>
      </div>
    </div>
  );
};
export default Modal;
