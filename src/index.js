import "./style";
import App from "./components/app";

import { Provider } from "unistore/preact";
import { store } from "./store";

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("./sw.js").then(function() {
//     console.log("Service Worker Registered");
//   });
// }

const LinkedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default LinkedApp;
