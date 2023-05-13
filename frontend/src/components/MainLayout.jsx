import React from 'react'
import Header from './Header'
import Footer from './Footer'

const MainLayout = ({ children }) => {
  return (
    <div className='flex flex-col mx-auto min-h-screen'>
        <Header />
        {children}
        <Footer />
    </div>
  )
}

export default MainLayout