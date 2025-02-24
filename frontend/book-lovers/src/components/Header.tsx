import SearchBar from "./SearchBar";

const Header: React.FC = () => {

  return (
    <>
      {/* fixed inset-x-0 */}
      <header className="border-b-1 border-gray-300 shadow bg-white sticky right-0 left-0 top-0 z-10">
        <div className="container flex justify-between items-center mx-auto  px-2 py-4">
          <div className="text-3xl font-bold hidden sm:block">Book Lovers</div>
            <div className="text-3xl font-bold sm:hidden">BL❤️</div>
          <div className="flex-1 max-w-2xl mx-4">
            <SearchBar />
          </div>
          <div className="sm:flex">
            <span className="hidden md:block">Log out</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
