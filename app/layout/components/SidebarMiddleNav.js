import React from 'react';

import { SidebarMenu } from './../../components';

export const SidebarMiddleNav = () => (
    <SidebarMenu>
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-home"></i>}
            title="Dashboards"
        >
            <SidebarMenu.Item title="Analytics" to='/dashboards/analytics' exact />
            <SidebarMenu.Item title="Projects" to='/dashboards/projects' exact />
            <SidebarMenu.Item title="System" to='/dashboards/system' exact />
            <SidebarMenu.Item title="Monitor" to='/dashboards/monitor' exact />
            <SidebarMenu.Item title="Financial" to='/dashboards/financial' exact />
            <SidebarMenu.Item title="Stock" to='/dashboards/stock' exact />
            <SidebarMenu.Item title="Reports" to='/dashboards/reports' exact />
        </SidebarMenu.Item>
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-th"></i>}
            title="Widgets"
            to='/widgets'
        />
        { /* -------- Cards ---------*/ }
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-clone"></i>}
            title="Cards"
        >
            <SidebarMenu.Item title="Cards" to='/cards/cards' exact />
            <SidebarMenu.Item title="Cards Headers" to='/cards/cardsheaders' exact />
        </SidebarMenu.Item>
        { /* -------- Layouts ---------*/ }
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-columns"></i>}
            title="Layouts"
        >
            <SidebarMenu.Item title="Navbar" to='/layouts/navbar' exact />
            <SidebarMenu.Item title="Sidebar" to='/layouts/sidebar' exact />
            <SidebarMenu.Item title="Sidebar A" to='/layouts/sidebar-a' exact />
            <SidebarMenu.Item title="Sidebar With Navbar" to="/layouts/sidebar-with-navbar" exact />
            <SidebarMenu.Item title="Drag &amp; Drop" to='/layouts/dnd-layout' exact />
        </SidebarMenu.Item>
        { /* -------- Interface ---------*/ }
        { /* -------- Graphs ---------*/ }
        { /* -------- Forms ---------*/ }
        { /* -------- Tables ---------*/ }
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-trello"></i>}
            title="Tables"
        >
            <SidebarMenu.Item title="Tables" to='/tables/tables' />
            <SidebarMenu.Item title="Extended Tables" to='/tables/extended-table' />
            <SidebarMenu.Item title="AgGrid" to='/tables/ag-grid' />
        </SidebarMenu.Item>
        { /* -------- Apps ---------*/ }
        { /* -------- Pages ---------*/ }
        { /* -------- Versions ---------*/ }
    </SidebarMenu >
);
