import { Login } from './Login/Login';
import style from './Popup.module.scss';

const Popup = () => {
  return (
    <div className={style.popup}>
      <Login />
    </div>
  );
};

export default Popup;
