import React, { useEffect } from 'react'
import classes from './Results.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {productUrl} from '../../Api/endPoints'
import { useState } from 'react'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'



function Results() {
  const [results, setResults] = useState([]);
  const {categoryName} = useParams()
  const [isLoading, setIsLoading] = useState(false)
  console.log(categoryName)
  useEffect(() => {
    axios.get(`${productUrl}/products/category/${categoryName}`)
  .then((res) => {
    console.log(res)
    setResults(res.data)
    setIsLoading(false)
  }) .catch((err) => {
    console.log(err)
    setIsLoading(false)
  })

  }, [])

  
  return (
    <LayOut>
       <section>
           <h1 style={{padding: "25px"}}>Results</h1>
           <p style={{padding: "25px"}}>Category /{categoryName}</p>
           <hr />
           {isLoading?(<Loader/>) : (<div className={classes.products_container}>
              {results?.map((Product) => (
                <ProductCard 
                  key={Product.id}
                  Product={Product}
                  renderDesc={false}
                  renderAdd={true}
                  />
              ))}

             </div>

           )}
             
       </section>
        
    </LayOut>
   
  )
}

export default Results