// src/components/Navbar/Navbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import {
  Nav, // Import Nav
  Bars, // Import Bars
  NavMenu, // Import NavMenu
  NavMenuLeft, // Import NavMenuLeft
  NavMenuRight, // Import NavMenuRight
  NavBtnLink, // Import NavBtnLink
  DropdownMenu, // Import DropdownMenu
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
            <NavBtnLink to="/" activestyle={{ fontWeight: "bold", color: "red" }}>
              Home
            </NavBtnLink>
            <NavBtnLink to="/GetStarted" activestyle={{ fontWeight: "bold", color: "red" }}>
              Get Started
            </NavBtnLink>
            <NavBtnLink to="/signup" activestyle={{ fontWeight: "bold", color: "red" }}>
              Sign Up
            </NavBtnLink>
          </NavMenuLeft>

          {/* Right-aligned items */}
          <NavMenuRight>
            <NavBtnLink to="/login">Login</NavBtnLink>
            <NavBtnLink to="/cart">Cart</NavBtnLink>
            <NavBtnLink to="/admin">Admin</NavBtnLink>
          </NavMenuRight>
        </NavMenu>

        {isDropdownOpen && (
          <DropdownMenu>
            <NavBtnLink
              to="/"
              activestyle={{ fontWeight: "bold", color: "red" }}
              onClick={closeDropdown}
            >
              Home
            </NavBtnLink>
            <NavBtnLink
              to="/GetStarted"
              activestyle={{ fontWeight: "bold", color: "red" }}
              onClick={closeDropdown}
            >
              Get Started
            </NavBtnLink>
            <NavBtnLink
              to="/signup"
              activestyle={{ fontWeight: "bold", color: "red" }}
              onClick={closeDropdown}
            >
              Sign Up
            </NavBtnLink>
            <NavBtnLink
              to="/login"
              activestyle={{ fontWeight: "bold", color: "red" }}
              onClick={closeDropdown}
            >
              Login
            </NavBtnLink>
            <NavBtnLink
              to="/cart"
              activestyle={{ fontWeight: "bold", color: "red" }}
              onClick={closeDropdown}
            >
              Cart
            </NavBtnLink>
            <NavBtnLink
              to="/admin"
              activestyle={{ fontWeight: "bold", color: "red" }}
              onClick={closeDropdown}
            >
              Admin
            </NavBtnLink>
          </DropdownMenu>
        )}
      </Nav>
    </>
  );
};

export default NavbarComponent;
