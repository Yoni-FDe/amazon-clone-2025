// This is consider as prons to pass 
import React from 'react'
import numeral from 'numeral'

const CurrencyFormat = ({amount}) => {
    const formattedAmount = numeral(amount).format("$0,0.00")
    return <div>{formattedAmount}</div>

}

export default CurrencyFormat
//Render to ProductCard