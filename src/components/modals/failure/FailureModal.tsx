import styles from '../Modal.module.css'
import svg from '../../../assets/modal/failure.svg'
interface ModalProps {
  onClose: () => void; 
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>Ошибка</p>

        <img className={styles.img} src={svg} alt="" />
        <button id='button-close' onClick={onClose} 
        className={styles.button}>Закрыть</button>
      </div>
    </div>
  );
};
export default Modal;