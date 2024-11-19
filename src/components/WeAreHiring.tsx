import { useState, useEffect } from "react";
import "../styles/WeAreHiring.scss";
import illustration from "../assets/image-illustration.png";
import companyNames from "../json/company.json";

const WeAreHiring = () => {
const initialCompany = localStorage.getItem("companyName") || "";
  const [storeCompany, setStoreCompany] = useState<string>(initialCompany);
  const [companySelected, setCompanySelected] = useState(false);
  const getCompanyNames = () => {
    return companyNames.map((item) => (
      <option key={item.name} value={item.name}>
        {item.name}
      </option>
    ));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStoreCompany(event.target.value);
    setCompanySelected(true);
  };
  useEffect(()=>{
    localStorage.setItem("companyName", storeCompany);
  },[storeCompany]);
  return (
    <>
      <div className="we-are-hiring">
        <div className="left-box">
          <img className="image-illustration" src={illustration} />
        </div>
        <div className="right-box">
          <span className="sticky-label">
            Connecting Employers & Job Seekers
          </span>
          <h1>Zotola Connect!</h1>
          <label>
            Explore exciting career opportunities on our innovative platform.
          </label>
          {companySelected ? (
            <a href="/join-us/" className="explore-button">
              explore opportunities
              <div>→</div>
            </a>
          ) : (
            <select
              name="options"
              className="custom-select"
              onChange={handleSelectChange}
            >
              <option value="">Select Company</option>
              {getCompanyNames()}
            </select>
          )}

          <div className="help-and-support">
            <span className="help-and-support-label">Help &amp; Support</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.99984 1.66669C5.39984 1.66669 1.6665 5.40002 1.6665 10C1.6665 14.6 5.39984 18.3334 9.99984 18.3334C14.5998 18.3334 18.3332 14.6 18.3332 10C18.3332 5.40002 14.5998 1.66669 9.99984 1.66669ZM9.1665 15.8334V14.1667H10.8332V15.8334H9.1665ZM11.8082 10.1417L12.5582 9.37502C13.4082 8.52502 13.6998 7.06669 12.7165 5.70835C11.9665 4.66669 10.7582 4.00835 9.4915 4.20835C8.19984 4.40835 7.15817 5.34169 6.79984 6.56669C6.6665 7.03335 6.99984 7.50002 7.48317 7.50002H7.73317C8.05817 7.50002 8.3165 7.26669 8.4165 6.95835C8.6915 6.16669 9.54984 5.64169 10.4748 5.90002C11.0582 6.06669 11.5248 6.57502 11.6332 7.17502C11.7415 7.75835 11.5582 8.30835 11.1748 8.67502L10.1415 9.72502C9.7915 10.075 9.5165 10.5084 9.34984 10.9917C9.23317 11.3334 9.1665 11.7 9.1665 12.0834V12.5H10.8332C10.8332 12.1167 10.8748 11.8167 10.9415 11.55C11.0915 10.95 11.3915 10.5667 11.8082 10.1417Z"
                fill="white"
              ></path>
            </svg>
            <ul>
              <li>
                <a href="/contact-us">Contact us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeAreHiring;
