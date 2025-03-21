import React, { useState, useEffect } from 'react';
import { SidebarTrigger } from './ui/sidebar';
import { Separator } from './ui/separator';

function Navbar() {
  const [visible, setVisible] = useState(true);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false); // Scroll down: hide navbar
      } else {
        setVisible(true); // Scroll up: show navbar
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 p-4 z-50 transition-transform duration-300 ease-in-out ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container mx-auto flex items-center justify-between flex-row gap-3 h-7">
        <SidebarTrigger variant={"secondary"} className='cursor-pointer' />
        <Separator orientation="vertical" />
        <h1 className="text-xl font-bold">Navbar</h1>
      </div>
    </div>
  );
}

export default Navbar;
