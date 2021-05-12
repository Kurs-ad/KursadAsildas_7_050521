import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/Body.css'
import './styles/Banner.css'
import './styles/Post.css'
import './styles/Sign.css'
import './styles/News.css'
import './styles/Friends.css'
import './styles/Nav.css'
import './styles/TabletSideContent.css'
import App from './components/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
