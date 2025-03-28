import styled from "styled-components";
import { Link } from "react-router-dom";

// Bars (Hamburger menu icon for mobile)
export const Bars = styled.div`
    display: none;
    font-size: 2rem;
    cursor: pointer;
    color: #fff;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;

    @media screen and (max-width: 768px) {
        display: block;
    }

    &:before {
        content: "\\2630"; /* Unicode for hamburger menu */
    }
`;

// Main Nav container
export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    background: #333;
    padding: 0 20px;
    color: #fff;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;

    @media screen and (max-width: 768px) {
        justify-content: space-between;
    }
`;

// Navbar menu container
export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-grow: 1;
    margin-left: 20px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

// Left-aligned menu
export const NavMenuLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
`;

// Right-aligned menu
export const NavMenuRight = styled.div.attrs(() => ({
    className: "nav-menu-right",
}))`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    padding-right: 10px;
    flex-shrink: 0;
`;

// Dropdown menu for mobile view
export const DropdownMenu = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 300px;
    text-align: center;

    a {
        color: #000;
        text-decoration: none;
        padding: 10px;
        border-bottom: 1px solid #eee;

        &:last-child {
            border-bottom: none;
        }

        &:hover {
            background-color: #f0f0f0;
        }
    }
`;

// Styled button that behaves like a Link (for navigation buttons in the Navbar)
export const LinkButton = styled(Link)`
    background: #256ce1;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 1rem;
    display: inline-block;
    margin-top: 20px;
    text-align: center;

    &:hover {
        background: #1e56a0;
    }
`;

// Button container for larger screens (right section of the Navbar)
export const NavBtn = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

// Individual Nav button links
export const NavBtnLink = styled(Link)`
    background: #256ce1;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    margin-left: 10px;

    &:hover {
        background: #fff;
        color: #256ce1;
        border: 1px solid #256ce1;
    }
`;

