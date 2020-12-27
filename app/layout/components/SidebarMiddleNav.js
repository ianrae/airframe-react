import React from 'react';

import { SidebarMenu } from './../../components';

export const SidebarMiddleNav = () => (
    <SidebarMenu>
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-home"></i>}
            title="Convert"
        >
            <SidebarMenu.Item title="CSV" to='/dashboards/datamend/wizard' exact />
            <SidebarMenu.Item title="Reports" to='/dashboards/reports' exact />
        </SidebarMenu.Item>
    </SidebarMenu >
);
