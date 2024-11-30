// This function, Header binding with child components
import React from 'react'
import Header from '../Header/Header'

function LayOut({children}) {
  return (
    <div>
        <Header/>
        {/* Render any child components passed to layout component */}
        {children}
    </div>
  )
}

export default LayOut
// This LayOut exporting to use other part of application like Result, ProductDetail, Landing
