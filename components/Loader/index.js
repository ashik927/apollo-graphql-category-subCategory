import React from 'react'
import logo from "../../public/logo/walcart.jpg"
import Image from 'next/image'


export const Loader  = ({isMobile}) => {
  return (
    <div className={isMobile ? "mobileLoader" : "loader"}>
        <Image
            src={logo}
            alt="Picture of the author"
            width={60}
            height={60}
          />
    </div>
  )
}
