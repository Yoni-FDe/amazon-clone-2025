import React, { useEffect, useState} from 'react'
import axios from 'axios'
import ProductCard from './ProductCard.jsx';
import classes from './Product.module.css'
import Loader from '../Loader/Loader.jsx';

function Product() {
   const [products, setProducts] = useState([]);
   const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
    .then((res)=> {
      // console.log(res)
      setProducts(res.data)
      setIsLoading(false)
    }) 
    .catch((err) => {
      console.log(err)
      setIsLoading(false)
    })
  }, [setProducts])

  return (
      <>
       {
        isLoading?(<Loader/>) : (<section className={classes.products_container}>
                {
                  products.map((singgleProduct) => {
                    return <ProductCard renderAdd={true} Product={singgleProduct} key={singgleProduct.id}/>
                  })
                }
                
              </section>  
        )
       }
              

      </>
  )
}

export default Product
