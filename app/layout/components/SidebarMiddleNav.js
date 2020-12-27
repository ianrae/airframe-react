import React from 'react';

import { SidebarMenu } from './../../components';

export const SidebarMiddleNav = () => (
    <SidebarMenu>
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-home"></i>}
            title="Convert"
        >
            <SidebarMenu.Item title="CSV" to='/dashboards/datamend/wizard/csv' exact />
            <SidebarMenu.Item title="JSON" to='/dashboards/datamend/wizard/json' exact />
        </SidebarMenu.Item>
    </SidebarMenu >
);
