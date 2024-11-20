import '../styles/Header.scss'

const Header = () => {
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
            <div></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
