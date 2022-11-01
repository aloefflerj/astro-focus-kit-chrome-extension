import React, { useState } from 'react';
import star from '@src/assets/img/star.svg';
// import { useAuth } from '../hooks/useAuth';
import { Option } from '@src/components/Card/Option';
// import star from '../assets/img/star.svg';
import { Card } from '@src/components/Card/Card';
import styles from './Login.module.scss';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //   const auth = useAuth();
  //   const navigate = useNavigate();

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    // try {
    //   await auth.authenticate(email, password);
    //   navigate('/tasks');
    // } catch (error) {
    //   alert(
    //     'Invalid email or password, try: eve.holt@reqres.in and pass: cityslicka'
    //   );
    // }
    alert('ok');
  };

  return (
    <div className={styles.login}>
      <Card type="logoLogin">
        <img src={star} alt="astro-focus-kit-logo" />
        <h1>ASTRO FOCUS KIT</h1>
        <img src={star} alt="astro-focus-kit-logo" />
      </Card>
      <div className={styles.form}>
        <input
          type="text"
          value={email}
          placeholder="Type your email"
          onChange={handleEmailInput}
        />
        <input
          type="password"
          value={password}
          placeholder="Type your password"
          onChange={handlePasswordInput}
        />
      </div>
      <button onClick={handleLogin} className={styles.loginButton}>
        <Option type="small" title="LOGIN" />
      </button>
    </div>
  );
};
