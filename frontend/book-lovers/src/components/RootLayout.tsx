import React from 'react';
import Header from './Header';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { Outlet } from "react-router-dom";
import AppSidebar from './AppSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import BookDetail from './BookDetail';

const RootLayout: React.FC = () => {
    const isMobile = useIsMobile();
    return (
        <>
            <Header />
            <SidebarProvider > 
                {/* I edited the sidebar height on line 234 of ui/sidebar.tsx */}
                <AppSidebar />
                <main>
                    {isMobile && <SidebarTrigger />}
                    <Outlet />
                </main>
            </SidebarProvider>

            {/* BookDetail will handle its own visibility based on route */}
            <BookDetail />
        </>
    );
};

export default RootLayout;