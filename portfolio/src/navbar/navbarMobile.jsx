import React from 'react'
import Logo from "../images/logo-SF.png";


const NavbarMobile = () => {
  return (
    <div className="flex md:hidden">
      {/* Logo */}
      <div>
        <img src={Logo} alt="logoMobile" />
      </div>
      {/* humburger button */}
      <div>
      </div>
    </div>
  )
}

export default NavbarMobile
