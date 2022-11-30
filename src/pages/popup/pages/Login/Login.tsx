import React, { useState } from 'react';
import star from '@src/assets/img/star.svg';
import { useAuth } from '../../../../hooks/useAuth';
import { Option } from '@src/components/Card/Option';
import { Card } from '@src/components/Card/Card';
import styles from './Login.module.scss';
import { useKeyDown } from '@src/hooks/useKeyDown';
import { EnvironmentConfig } from '@src/config/environmentConfig';

export const Login = () => {
  const basePath = EnvironmentConfig.mainClientApiBasePath;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const { handleOnEnter } = useKeyDown();

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      await auth.authenticate(email, password);
    } catch (error) {
      alert('Invalid login');
    }
    chrome.tabs.query({ url: `${basePath}/*` }, function (tabs) {
      tabs.forEach((tab) => {
        chrome.tabs.remove(tab.id);
      });
    });
    chrome.tabs.create({ url: basePath });
    chrome.tabs.query({ url: `${basePath}/*` }, function (tabs) {
      tabs.forEach((tab) => {
        chrome.tabs.reload(tab.id);
      });
    });
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
          onKeyDown={(e) => handleOnEnter(e, handleLogin)}
        />
        <input
          type="password"
          value={password}
          placeholder="Type your password"
          onChange={handlePasswordInput}
          onKeyDown={(e) => handleOnEnter(e, handleLogin)}
        />
      </div>
      <button onClick={handleLogin} className={styles.loginButton}>
        <Option type="small" title="LOGIN" />
      </button>
    </div>
  );
};
