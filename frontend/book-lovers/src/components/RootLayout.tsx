import React from 'react';
import Header from './Header';
import { SidebarProvider } from './ui/sidebar';
import { Outlet } from "react-router-dom";
import AppSidebar from './AppSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const RootLayout: React.FC = () => {
    const isMobile = useIsMobile();
    return (
        <>
            <Header />
            <SidebarProvider className={`${isMobile ? 'hidden' : ''}`}> 
                {/* I edited the sidebar height on line 234 of ui/sidebar.tsx */}
                <AppSidebar />
                <main>
                    {/* <SidebarTrigger /> */}
                    <Outlet />
                </main>
            </SidebarProvider>
        </>
    );
};

export default RootLayout;