import '../styles/Footer.scss';

import ThemeToggle from './ThemeToggle';

const Footer = () => {
  return (
    <footer>
    <div className="container">
      © 2024 Dream Jobs. All rights reserved. (Platform designed to help
      freshers and experienced professionals find their dream job easily.)
        <ThemeToggle />
    </div>
  </footer>
  )
}

export default Footer
