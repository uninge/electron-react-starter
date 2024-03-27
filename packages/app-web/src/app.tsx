import React from 'react';
import TitleBar from '@/components/TitleBar';
import s from './index.module.less';
import './index.less';
import 'sanitize.css';

export default function App() {
  return (
    <div className={s.app}>
      <TitleBar />
      <img src={''} />
      <video src=""></video>
      <webview className={s.webview} src="https://www.github.com/" />
      <webview className={s.webview} src="https://www.github.com/" />
    </div>
  );
}
