import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ImMenu3 } from "react-icons/im";
import { IoMdCloseCircle } from "react-icons/io";

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
        <PopoverTrigger asChild>
          {isOpen ? (
            <IoMdCloseCircle className="text-4xl font-bold sm:hidden" />
          ) : (
            <ImMenu3 className="text-4xl font-bold sm:hidden" />
          )}
        </PopoverTrigger>
        <PopoverContent align="start" sideOffset={20} className="w-500px]">
          Place content for the popover here.
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MobileMenu;
