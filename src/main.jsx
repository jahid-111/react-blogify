import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/provide-context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Router>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </Router>
  // </React.StrictMode>
);
