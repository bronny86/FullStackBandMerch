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
                        <NavLink to="/" activestyle={{ fontWeight: "bold", color: "red" }}>
                            Home
                        </NavLink>
                        <NavLink to="/GetStarted" activestyle={{ fontWeight: "bold", color: "red" }}>
                            Get Started
                        </NavLink>
                    </NavMenuLeft>

                    {/* Right-aligned items */}
                    <NavMenuRight>
                        <NavBtnLink to="/signup">Sign Up</NavBtnLink>
                        <NavBtnLink to="/login">Login</NavBtnLink>
                        <NavBtnLink to="/cart">Cart</NavBtnLink>
                    </NavMenuRight>
                </NavMenu>

                {isDropdownOpen && (
                    <DropdownMenu>
                        <NavLink
                            to="/"
                            activestyle={{ fontWeight: "bold", color: "red" }}
                            onClick={closeDropdown}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/GetStarted"
                            activestyle={{ fontWeight: "bold", color: "red" }}
                            onClick={closeDropdown}
                        >
                            Get Started
                        </NavLink>
                        <NavLink
                            to="/signup"
                            activestyle={{ fontWeight: "bold", color: "red" }}
                            onClick={closeDropdown}
                        >
                            Sign Up
                        </NavLink>
                        <NavLink
                            to="/login"
                            activestyle={{ fontWeight: "bold", color: "red" }}
                            onClick={closeDropdown}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/cart"
                            activestyle={{ fontWeight: "bold", color: "red" }}
                            onClick={closeDropdown}
                        >
                            Cart
                        </NavLink>
                    </DropdownMenu>
                )}
            </Nav>
        </>
    );
};

export default NavbarComponent;