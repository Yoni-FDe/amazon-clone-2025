import React, {useEffect, useState} from 'react'
import classes from './ProductDetail.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { productUrl } from '../../Api/endPoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'

function ProductDetail() {
  const {productId} = useParams()
  const [product, setProduct] = useState()
  const [isLoading, setIsLoading] = useState(false)
  // console.log(productId)

  useEffect(() =>{
    setIsLoading(true) // to show loaded products
    axios.get(`${productUrl}/products/${productId}`)
    .then((res) => {
      setProduct(res.data)
      setIsLoading(false)
    }) .catch((err) => {
      console.log(err)
      setIsLoading(false) // don't show the err
    })

  }, [])
// console.log(product)

  return (
    <LayOut>

      {/* If loading is true, show the Loader component, otherwise show the product details */}
      {isLoading ? (
        <Loader />
      ) : (
        // Display the product using ProductCard component once the data is available
       product &&  // if statement to check product 
        <ProductCard
          Product={product}// Pass the product data to ProductCard
          flex = {true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    
    </LayOut>
  )
}

export default ProductDetail