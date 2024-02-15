import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const LLayout = ({children}) => {
  return (
    <React.Fragment>
        <Header/>
        {children}
        <Footer/>
    </React.Fragment>
  )
}

export default LLayout