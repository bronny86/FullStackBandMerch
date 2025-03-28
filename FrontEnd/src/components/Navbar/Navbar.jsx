import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Nav,
  Bars,
  NavMenu,
  NavMenuLeft,
  NavMenuRight,
  NavBtnLink,
  DropdownMenu,
  NavButton,  // Use the same NavButton styling for all buttons
} from "./NavbarElements"; // Adjust the path if necessary

const NavbarComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    console.log("Hamburger menu clicked");
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false); // Close the dropdown menu
  };

  return (
    <>
      <Nav>
        <Bars onClick={toggleDropdown} /> {/* Hamburger menu toggle */}

        <NavMenu>
          {/* Left-aligned items */}
          <NavMenuLeft>
            <NavButton onClick={() => window.location.href = '/'}>Home</NavButton>
            <NavButton onClick={() => window.location.href = '/GetStarted'}>Get Started</NavButton>
          </NavMenuLeft>

          {/* Right-aligned items */}
          <NavMenuRight>
            <NavBtnLink to="/signup">Sign Up</NavBtnLink>
            <NavBtnLink to="/login">Login</NavBtnLink>
            <NavBtnLink to="/cart">Cart</NavBtnLink>
            <NavButton onClick={() => window.location.href = '/admin'}>Admin</NavButton>
          </NavMenuRight>
        </NavMenu>

        {isDropdownOpen && (
          <DropdownMenu>
            <NavButton onClick={() => window.location.href = '/'}>Home</NavButton>
            <NavButton onClick={() => window.location.href = '/GetStarted'}>Get Started</NavButton>
            <NavButton onClick={() => window.location.href = '/signup'}>Sign Up</NavButton>
            <NavButton onClick={() => window.location.href = '/login'}>Login</NavButton>
            <NavButton onClick={() => window.location.href = '/cart'}>Cart</NavButton>
            <NavButton onClick={() => window.location.href = '/admin'}>Admin</NavButton>
          </DropdownMenu>
        )}
      </Nav>
    </>
  );
};

export default NavbarComponent;
