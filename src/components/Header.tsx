import '../styles/Header.scss';
import { useState } from 'react';
import companyIcon from '../assets/company.svg'

const Header = () => {
  const [currentCompany] = useState(localStorage.getItem('companyName'))
  return (
    <header>
      <div className="total-jobs">
        <div className="container">
          <div className="header-bar">
            <a href="/" className="button-outline">
              ← Back
            </a>
            <h1>
            Zotola Connect
            </h1>
            <div className='active-company'>
              <img src={companyIcon} height="18" width="18" alt="" />{currentCompany}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
