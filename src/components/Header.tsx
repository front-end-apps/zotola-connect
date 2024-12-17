import "../styles/Header.scss";
import { useState, useEffect } from "react";
import companyIcon from "../assets/company.svg";
import CompanyList from "./CompanyList";

const Header = () => {
  const [reloadScreen, setReloadScreen] = useState(false);
  const [isJobsPage, setIsJobsPage] = useState(false);
  const [currentCompany] = useState(localStorage.getItem("companyName") || "");
  const selectCompany = (value: boolean) => {
    setReloadScreen(value);
  };
  useEffect(() => {
    if (reloadScreen) {
      window.location.reload();
    }
    if (window.location.pathname === "/explore-opportunities") {
      setIsJobsPage(true);
    } else {
      setIsJobsPage(false);
    }
  }, [reloadScreen]);
  return (
    <header>
      <div className="total-jobs">
        <div className="container">
          <div className="header-bar">
            <h1>Zotola Connect</h1>
            {isJobsPage ? (
              <div className="active-company">
                <img src={companyIcon} height="18" width="18" alt="" />
                <CompanyList
                  is_selected={selectCompany}
                  selected_option={currentCompany}
                />
              </div>
            ) : (
              <a href="/explore-opportunities" className="button-outline">
                <span>Explore More</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
