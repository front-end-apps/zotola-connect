import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import WeAreHiring from "./components/WeAreHiring";
import JoinUs from "./components/JoinUs";
import Header from "./components/Header";
import Footer from './components/Footer';

function App() {
  return (
    <Router 
      future={{
        v7_startTransition: true,  // Optionally enable the transition flag
        v7_relativeSplatPath: true // Opt-in to the relative splat path behavior
      }}
    >
      <HeaderWrapper />
      <Routes>
        <Route path="/" element={<WeAreHiring />} />
        <Route path="/join-us/" element={<JoinUs />} />
      </Routes>
      <FooterWrapper/>
    </Router>
  );
}

function HeaderWrapper() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Header />}
    </>
  );
}

function FooterWrapper() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Footer />}
    </>
  );
}

export default App;
