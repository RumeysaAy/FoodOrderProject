import Link from 'next/link'
import React from 'react'

//pointer : İmlecin linkte olduğu gibi el şeklinde gözükmesini sağlar.
const Logo = () => {
  return (
    <Link href="/">
      <span className="
      text-[2rem]
      font-dancing
      font-bold
      cursor-pointer
      ">Burger</span>
      </Link>
  )
}

export default Logo