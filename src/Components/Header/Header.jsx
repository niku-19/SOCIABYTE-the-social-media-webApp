import {MdSearch} from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";

import styles from "./Header.module.css";
const Header = () => (
  <div className={styles.header__container}>
    <div className={styles.links}>
      <div className={styles.link}>Home</div>
      <div className={styles.link}></div>
      <div className={styles.link}>About</div>
    </div>
    <div className={styles.search__bar}>
      <input type="text" placeholder="Search" />
      <MdSearch className={styles.search__icon} />
    </div>
    <div className={styles.icons__container}>
      <div className={styles.icon}>
        <AiFillMessage className={styles.message__icon} />
      </div>
      <div className={styles.icon}>
        <MdNotifications className={styles.notification__icon} />
      </div>
    </div>
  </div>
)

export default Header
