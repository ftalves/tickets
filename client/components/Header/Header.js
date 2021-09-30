import React from 'react';
import Link from 'next/link';

const HeaderLink = ({ label, href }) => {
  return (
    <li className="nav-item">
      <Link href={href}>
        <a className="nav-link">{label}</a>
      </Link>
    </li>
  );
};

const Header = ({ currentUser }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {!currentUser ? (
            <>
              <HeaderLink label="Sign Up" href="/auth/signup" />
              <HeaderLink label="Sign In" href="/auth/signin" />
            </>
          ) : null}
          {currentUser ? (
            <HeaderLink label="Sign Out" href="/auth/signout" />
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export { Header };
