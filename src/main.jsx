import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/provide-context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
  // </React.StrictMode>
);
