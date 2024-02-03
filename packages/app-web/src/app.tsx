import React from 'react';
import s from './index.module.less';
import './index.less';

export default function App() {
  return (
    <div className={s.app}>
      <webview className={s.webview} src="https://www.github.com/" />
      <webview className={s.webview} src="https://www.github.com/" />
    </div>
  );
}
