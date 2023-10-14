import Navbar1 from "./components/Navbar1";
import Carousel from "./components/Carousel";
import Navbar2 from "./components/Navbar2";
import PleaseLogIn from "./components/PleaseLogIn";
import { Routes, Route, useLocation } from "react-router-dom";
import News from "./components/news/News";
import UserTable from "./components/users/UserTable";
import { useState, useEffect } from "react";
import Footer from "./components/footers/Footer";
import Dashboard from "./components/users/Dashboard";
import Role from "./components/users/Role";
import ReactDOM from "react-dom";

const FooterPortal = () => {
  const portalRoot = document.getElementById("footer-root");
  return ReactDOM.createPortal(<Footer />, portalRoot);
};

function App() {
  const [pageSize, setPageSize] = useState(6);
  const [isSignedIn, setIsSignedIn] = useState(false);
  let apiKey = import.meta.env.VITE_REACT_APP_NEWS_API_KEY;

  const location = useLocation();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userlogdata"));
    user != null ? setIsSignedIn(true) : setIsSignedIn(false);
  }, [location]);
  
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar1 name="Topics" isActive="1" isDrop="0" />
              <Carousel
                apiKey={apiKey}
                key="general"
                country="in"
                category="general"
                search="0"
                refresh="1"
              />
            </>
          }
        />
        <Route
          path="/business"
          element={
            <>
              <Navbar1 name="Business" isActive="0" isDrop="1" />
              <News
                apiKey={apiKey}
                key="business"
                pageSize={pageSize}
                country="in"
                search="0"
                category="business"
              />
            </>
          }
        />
        <Route
          path="/entertainment"
          element={
            <>
              <Navbar1 name="Entertainment" isActive="0" isDrop="1" />
              <News
                apiKey={apiKey}
                key="entertainment"
                pageSize={pageSize}
                country="in"
                search="0"
                category="entertainment"
              />
            </>
          }
        />
        <Route
          path="/health"
          element={
            <>
              <Navbar1 name="Health" isActive="0" isDrop="1" />
              <News
                apiKey={apiKey}
                key="health"
                pageSize={pageSize}
                country="in"
                category="health"
                search="0"
              />
            </>
          }
        />
        <Route
          path="/sports"
          element={
            <>
              <Navbar1 name="Sports" isActive="0" isDrop="1" />
              <News
                apiKey={apiKey}
                key="sports"
                pageSize={pageSize}
                country="in"
                category="sports"
                search="0"
              />
            </>
          }
        />
        <Route
          path="/technology"
          element={
            <>
              <Navbar1 name="Technology" isActive="0" isDrop="1" />
              <News
                apiKey={apiKey}
                key="technology"
                pageSize={pageSize}
                country="in"
                search="0"
                category="technology"
              />
            </>
          }
        />
        <Route
          path="/science"
          element={
            <>
              <Navbar1 name="Science" isActive="0" isDrop="1" />
              <News
                apiKey={apiKey}
                key="science"
                pageSize={pageSize}
                country="in"
                search="0"
                category="science"
              />
            </>
          }
        />
        <Route
          path="/news"
          element={
            <>
              {isSignedIn ? (
                <>
                  <Navbar2 />
                  <News
                    apiKey={apiKey}
                    key="general"
                    pageSize={pageSize}
                    country="in"
                    category="general"
                    search="2"
                  />
                </>
              ) : (
                <PleaseLogIn />
              )}
            </>
          }
        />

        <Route
          path="/search"
          element={
            <>
              {isSignedIn ? (
                <>
                  <Navbar2 />
                  <News apiKey={apiKey} pageSize={pageSize} search="1" />
                </>
              ) : (
                <PleaseLogIn />
              )}
            </>
          }
        />

        <Route
          path="/user"
          element={
            <>
              {isSignedIn ? (
                <>
                  <Navbar2 />
                  <UserTable />
                </>
              ) : (
                <PleaseLogIn />
              )}
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <>
              {isSignedIn ? (
                <>
                  <Navbar2 />
                  <Dashboard />
                </>
              ) : (
                <PleaseLogIn />
              )}
            </>
          }
        />

        <Route
          exact
          path="/useredit"
          element={
            <>
              {isSignedIn ? (
                <>
                  <Navbar2 />
                  <Role />
                </>
              ) : (
                <PleaseLogIn />
              )}
            </>
          }
        />
      </Routes>
      <FooterPortal />
    </>
  );
}

export default App;
