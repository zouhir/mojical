import "./style";
import App from "./components/app";

import { Provider } from "unistore/preact";
import { store } from "./store";

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("./sw.js").then(function() {
//     console.log("Service Worker Registered");
//   });
// }

// pre-render check
if (typeof window !== "undefined") {
  window.requestAnimationFramePromise = _ => new Promise(requestAnimationFrame);
  window.transitionEndPromise = elem =>
    new Promise(resolve => {
      elem.addEventListener("transitionend", resolve, { once: true });
    });
}

const LinkedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default LinkedApp;
