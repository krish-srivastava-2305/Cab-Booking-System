import { Route, Routes } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import Start from "./pages/Start";
import CaptainLogin from "./pages/CaptainLogin";
import UserSignup from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import Home from "./pages/Home";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainHome from "./pages/CaptainHome";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />

        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />

        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
