// import React, { useState } from "react";
// import { ImMenu3 } from "react-icons/im";
// import { IoMdCloseCircle } from "react-icons/io";
import MobileMenu from "./MobileMenu";

const Header: React.FC = () => {
//   const [menuIsOpened, setMenuIsOpened] = useState(false);

//   const handleOpenMenu = () => {
//     setMenuIsOpened(true);
//   };

//   const handleCloseMenu = () => {
//     setMenuIsOpened(false);
//   };

  return (
    <>
      {/* fixed inset-x-0 */}
      <header className="border-b-1 border-gray-300 shadow bg-white">
        <div className="container flex justify-between items-center mx-auto  px-2 py-4">
          <div className="text-3xl font-bold">Book Lovers</div>
          <div className="sm:flex">
            <span className="hidden sm:block">Log out</span>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
