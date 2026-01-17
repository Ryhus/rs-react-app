import { Link } from 'react-router-dom';
import { SwitchThemeBttn } from './SwitchThemeBttn/SwitchThemeBttn';

import './HeaderStyles.scss';

function Header() {
  return (
    <header className="site-header">
      <div className="logo">
        <Link to="/">🐶 BelovedDogs</Link>
      </div>

      <nav className="nav-links">
        <SwitchThemeBttn />
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
}

export default Header;
