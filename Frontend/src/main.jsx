import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserContextComponent } from "./contexts/userContext.jsx";
import { CaptainContextComponent } from "./contexts/captainContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { SocketContextProvider } from "./contexts/socketContext.jsx";

createRoot(document.getElementById("root")).render(
  <CaptainContextComponent>
    <UserContextComponent>
      <SocketContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketContextProvider>
    </UserContextComponent>
  </CaptainContextComponent>
);
