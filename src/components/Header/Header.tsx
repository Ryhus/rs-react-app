'use client';

import Link from 'next/link';
import { SwitchThemeBttn } from './SwitchThemeBttn/SwitchThemeBttn';

import './HeaderStyles.scss';

function Header() {
  return (
    <header className="site-header">
      <div className="logo">
        <Link href="/">🐶 BelovedDogs</Link>
      </div>

      <nav className="nav-links">
        <SwitchThemeBttn />
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}

export default Header;
