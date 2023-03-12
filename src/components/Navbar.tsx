import React, { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineSearch, AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import toast from "react-hot-toast";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [navBtn, setNavBtn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.replace(/\s/g, "").length === 0) {
      toast.error("Input value is invalid");
      return null;
    }
    setNavBtn(!navBtn);
    navigate(`/search/${search}`);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setSearch("");
    }
  }, [location.pathname]);

  const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };
  return (
    <div className="relative w-full h-[15vh] flex justify-between items-center border-b-solid border-b-[1px] border-b-gray-200 2xl:max-w-7xl 2xl:mx-auto">
      <Link className="flex items-center gap-1" to="/">
        <img className="w-6 h-6 object-cover" src="/blocDark.svg" alt="logo" />
        <p className="text-2xl font-poppins">Bloc</p>
      </Link>
      <div className="hidden lg:flex items-center gap-5">
        <form
          className="flex items-center gap-1 px-4 py-2 border-solid border-[1px] border-gray-200 rounded-lg w-[400px]"
          onSubmit={handleSearch}
        >
          <AiOutlineSearch />
          <input
            className="w-full outline-none border-none bg-transparent"
            placeholder="Search"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
        <nav className="flex items-center gap-5">
          <Link to="/">Home</Link>
          <Link to="/crypto">Crypto</Link>
          <Link to="/news">News</Link>
        </nav>
      </div>
      <AiOutlineMenu
        className="text-lg cursor-pointer lg:hidden"
        onClick={() => setNavBtn(!navBtn)}
      />
      <div
        className={cn(
          "lg:hidden fixed top-0 right-0 z-[4000] bg-gray-100 w-full h-[100vh] px-[2vw] duration-[.8s] flex justify-start items-start flex-col gap-4",
          navBtn ? "translate-x-0" : "translate-x-[100%]"
        )}
      >
        <div className="w-full h-[15vh] flex justify-end items-center border-b-solid border-b-[1px] border-b-gray-200">
          <AiOutlinePlus
            className="rotate-45 text-lg"
            onClick={() => setNavBtn(!navBtn)}
          />
        </div>
        <form
          className="w-full px-4 py-2 flex items-center gap-1 border-solid border-gray-200 border-[1px] rounded-lg"
          onSubmit={handleSearch}
        >
          <AiOutlineSearch />
          <input
            className="w-full bg-transparent border-none outline-none"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
        <Link
          className="w-full py-2 border-b-solid border-b-[1px] border-b-gray-200"
          to="/"
          onClick={() => setNavBtn(!navBtn)}
        >
          Home
        </Link>
        <Link
          className="w-full py-2 border-b-solid border-b-[1px] border-b-gray-200"
          to="/crypto"
          onClick={() => setNavBtn(!navBtn)}
        >
          Crypto
        </Link>
        <Link
          className="w-full py-2 border-b-solid border-b-[1px] border-b-gray-200"
          to="/news"
          onClick={() => setNavBtn(!navBtn)}
        >
          News
        </Link>
      </div>
    </div>
  );
}
