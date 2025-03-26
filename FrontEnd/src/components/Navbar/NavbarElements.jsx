import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

export const Bars = styled.div`
    display: none;
    font-size: 2rem;
    cursor: pointer;
    color: #fff;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px; /* Vertically center the content */

    @media screen and (max-width: 768px) {
        display: block;
    }

    &:before {
        content: "\\2630"; /* Unicode for hamburger menu */
    }
`;

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between; /* Space out the navbar sections */
    align-items: center;
    height: 80px;
    background: #333; /* Navbar background color */
    padding: 0 20px; /* Add padding to the left and right */
    color: #fff;
    width: 100%; /* Ensure the navbar spans the full width of the screen */
    position: fixed; /* Keep the navbar at the top */
    top: 0;
    left: 0;
    z-index: 1000; /* Ensure it stays above other elements */


    @media screen and (max-width: 768px) {
        justify-content: space-between;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; /* Space out the left and right sections */
    width: 100%; /* Ensure the menu spans the full width */
    flex-grow: 1; /* Allow the menu to take up available space */
    margin-left: 20px; /* Add spacing between the menu and the hamburger icon */

    @media screen and (max-width: 768px) {
        display: none; /* Hide the full navbar on smaller screens */
    }
`;

export const NavMenuLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start; /* Align items to the left */
    
    gap: 20px; /* Add spacing between items */
`;

export const NavMenuRight = styled.div.attrs(() => ({
    className: "nav-menu-right",
}))`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    padding-right: 10px;
    flex-shrink: 0;
    max-width: 100%;
`;



export const DropdownMenu = styled.div`
    position: fixed; /* Position the menu relative to the viewport */
    top: 50%; /* Center vertically */
    left: 50%; /* Center horizontally */
    transform: translate(-50%, -50%); /* Adjust for the element's size */
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 300px; /* Set a fixed width for the menu */
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

export const NavBtn = styled.div`
    display: flex;
    align-items: center;
    gap: 10px; /* Add spacing between buttons */

    @media screen and (max-width: 768px) {
        display: none; /* Hide buttons on smaller screens */
    }
`;

export const NavBtnLink = styled(RouterNavLink)`
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