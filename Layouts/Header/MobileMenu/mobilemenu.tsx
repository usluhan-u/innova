import { FunctionComponent } from "react";
import styles from "./MobileMenu.module.css";

type MobileMenuType = {
  onClose?: () => void;
};

const MobileMenu: FunctionComponent<MobileMenuType> = ({ onClose }) => {
  return (
    <div className={styles.mobilemenu}>
    </div>
  );
};

export default MobileMenu;
