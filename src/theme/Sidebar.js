import React, { useState } from "react";
import { slide as SideNavMenu } from "react-burger-menu";
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function SideNavBar() {

    const [menuOpen, setMenuOpen] = useState(false);

    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    const handleStateChange = () => {
        setMenuOpen(true);
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    const closeMenu = () => {
        setMenuOpen(false);
    }

    // This can be used to toggle the menu, e.g. when using a custom icon
    // Tip: You probably want to hide either/both default icons if using a custom icon
    // See https://github.com/negomi/react-burger-menu#custom-icons
    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

        return (
            <SideNavMenu
                left
                width={"280px"}
                isOpen={menuOpen}
                onStateChange={() => handleStateChange()}
            >
                <div className="side-navbar-brand">
                    <Link
                        onClick={() => closeMenu()}
                        to="/"
                        className="primary-color"
                    >
                        <div>FinanceM4</div>
                    </Link>
                </div>
                <div className="side-navbar-body">
                    {/* <img src={Logo} className="App-logo" alt="logo" /> */}
                    <Link
                        to="/"
                        className="sidenav-items"
                    >
                        Home
                    </Link>
                    <Link
                        to="/"
                        className="sidenav-items"
                    >
                        About
                    </Link>
                    <Link
                        to="/"
                        className="sidenav-items"
                    >
                        Work
                    </Link>
                    <Link
                        to="/"
                        className="sidenav-items"
                    >
                        Contact Me
                    </Link>
                </div>
            </SideNavMenu>
        );
    }
