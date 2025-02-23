import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from './ui/sidebar';
import Filters from './Filters';

const EmptyComponent: React.FC = () => {
    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <Filters />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    );
};

export default EmptyComponent;
