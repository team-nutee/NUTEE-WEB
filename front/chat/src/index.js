import React from 'react';
// import './assets/index.css';
import App from './components/App';
// import * as serviceWorker from './serviceWorker';

const Chatting =()=>{
    return(
        <>
            <App />
            <style jsx>
                {`
                    body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #effbf5;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

* {
  -webkit-appearance: none;
}

*:focus {
  outline: none;
}
                `}
            </style>
        </>
    )
};

export default Chatting;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
