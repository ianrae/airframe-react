import React from 'react';
import faker from 'faker/locale/en_US';
import { Link } from 'react-router-dom';

import { 
    Sidebar,
    UncontrolledButtonDropdown,
    Avatar,
    AvatarAddOn,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from './../../../components';
import { randomAvatar } from './../../../utilities';

const avatarImg = randomAvatar();

const SidebarTopA = () => (
    <React.Fragment>
        { /* START: Sidebar Default ianyes */ }
        <Sidebar.HideSlim>
            <Sidebar.Section className="pt-0">

                <UncontrolledButtonDropdown>
                    <DropdownMenu persist>
                    <DropdownItem divider />
                    <DropdownItem tag={ Link } to="/apps/profile-details">
                        My Profile
                    </DropdownItem>
                    <DropdownItem tag={ Link } to="/apps/settings-edit">
                        Settings
                    </DropdownItem>
                    <DropdownItem tag={ Link } to="/apps/billing-edit">
                        Billings
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem tag={ Link } to="/pages/login">
                        <i className="fa fa-fw fa-sign-out mr-2"></i>
                        Sign Out
                    </DropdownItem>
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
            </Sidebar.Section>
        </Sidebar.HideSlim>
        { /* END: Sidebar Default */ }

        { /* START: Sidebar Slim */ }
        <Sidebar.ShowSlim>
            <Sidebar.Section>
                <Avatar.Image
                    size="sm"
                    src={ avatarImg }
                    addOns={[
                        <AvatarAddOn.Icon 
                            className="fa fa-circle"
                            color="white"
                            key="avatar-icon-bg"
                        />,
                        <AvatarAddOn.Icon 
                            className="fa fa-circle"
                            color="success"
                            key="avatar-icon-fg"
                        />
                    ]}
                />
            </Sidebar.Section>
        </Sidebar.ShowSlim>
        { /* END: Sidebar Slim */ }
    </React.Fragment>
)

export { SidebarTopA };
