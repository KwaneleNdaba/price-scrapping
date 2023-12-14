import Image from "next/image";
import Link from "next/link";
import React from "react";



function Navbar() {

    const navIcons = [
        {src : "/assets/icons/search.svg" , alt :"search"},
        {src : "/assets/icons/black-heart.svg" , alt :"heart"},
        {src : "/assets/icons/user.svg" , alt :"user"}
    ]

  return (
    <header className="w-full">
      <nav className="nav">
        <Link className="flex items-center gap-1" href="/">
          <Image
            src="/assets/icons/logo.svg"
            width={30}
            height={30}
            alt=" logo"
          />
          <p className="nav-logo ">
            Price<span className="text-primary">Tracker</span>
          </p>
        </Link>
        <div className="flex items-center gap-5">
        {navIcons.map((icon:any) => (
            <Image 
            key={icon.src}
            src={icon.src}
            alt = {icon.alt} 
            width={28}
            height={28}
            className="object-contain"            
            />
        ))}
      </div>
      </nav>
    
    </header>
  );
}

export default Navbar;
