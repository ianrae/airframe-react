import React from 'react';
import { Link } from 'react-router-dom';

import {
    Navbar,
    Nav,
    NavItem,
    SidebarTrigger
} from './../../components';

import { NavbarActivityFeed } from './NavbarActivityFeed';
import { NavbarMessages } from './NavbarMessages';
import { NavbarUser } from './NavbarUser';
import { LogoThemed } from './../../routes/components/LogoThemed/LogoThemed';

export const DefaultNavbar = () => (
    <Navbar light expand="xs" fluid>
        <Nav navbar>
            <NavItem className="mr-3">
                <SidebarTrigger/>
            </NavItem>
            <NavItem className="navbar-brand d-lg-none">
                <Link to="/">
                    <LogoThemed />
                </Link>
            </NavItem>
            <NavItem className="d-none d-md-block">
                <span className="navbar-text">
                    <Link to="/">
                        <i className="fa fa-home"></i>
                    </Link>
                </span>
                <span className="navbar-text px-2">
                    <i className="fa fa-angle-right"></i>
                </span>
                <span className="navbar-text">
                    <Link to="/">CSV</Link>
                </span>
                <span className="navbar-text px-2">
                    <i className="fa fa-angle-right"></i>
                </span>
                <span className="navbar-text">
                    Convert CSV Data
                </span>
            </NavItem>
        </Nav>
        <Nav navbar className="ml-auto">
        </Nav>
    </Navbar>
);
