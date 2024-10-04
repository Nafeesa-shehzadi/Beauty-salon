import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "../src/redux/store"; // Adjust the path as necessary
import App from "./App"; // Adjust the path as necessary

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
