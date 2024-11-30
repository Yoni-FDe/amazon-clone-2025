import React,{useContext, useState} from 'react'
import classes from './Payment.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'
import {useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
// import axiosInstance from '../../Api/axios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {GridLoader} from 'react-spinners'
import {db} from '../../Utility/firebase'
import {Type} from "../../Utility/action.type"


// function Payment() {
//   const [{user,basket}] = useContext(DataContext);
     
//    // This render from Header.jsx
//    const totalItem = basket?.reduce((amount,item)=> {
//       return item.amount + amount
//     },0);


//   return (
//     <LayOut>
//       {/* Header part */}
//       <div className={classes.payment__header}>CheckOut ({totalItem})</div>
//       {/* payment method */}
//       <section className={classes.Payment}>
//         {/* address */}
//         <div className={classes.flex}>
//           <h3>Delivery Address</h3>
    
//               <div>({user.email})</div>
//               <div>1300 Court House</div>
//               <div>Arilngton, VA</div>
            
//         </div>
//         <hr />

//         {/* product section */}
//         <div className={classes.flex}>
//            <h3>Review items and delivery</h3>
//            <div>
//               {
//                 basket?.map((item)=> <ProductCard product={item} flex={true}/>)
//               }
//             </div>
//         </div>

//         <hr />

//         {/* card from  */}
//         <div></div>
//       </section>
//     </LayOut>
//   )
// }

// export default Payment


function Payment() {
  const [{user,basket}, dispatch] = useContext(DataContext);
  console.log(user)

  // This is Total items render from 
  const totalItem = basket?.reduce((amount, item)=> {
    return item.amount + amount;
  },0);

  // This is for totap price from render cart
    const total = basket.reduce((amount, item)=>{
    return item.price * item.amount + amount;
  }, 0);


  const [cardError, setCardError] = useState(null) // State to track any card-related errors
  const [processing, setProcessing] = useState(false); // State to track if payment is being 

   const stripe = useStripe(); // Stripe hook to access Stripe functionality
  const elements = useElements(); // Stripe hook to access the card input elements
  const navigate = useNavigate();


    const handleChange = (e) => {
      // e.preventDefault()
      console.log(e);
      e?.error?.message? setCardError(e?.error?.message): setCardError("")
    };
     
    //  const baseUrl= "http://127.0.0.1:5001/clone-y2024/us-central1/api";
     
    // This is to prevent default resfesh 
    const handlePayment = async(e) => {
        e.preventDefault()
      try {
        setProcessing(true)
        const baseUrl= "http://127.0.0.1:5001/clone-y2024/us-central1/api";
        
          // 1. backend , function -- contact to get the client secret
          // const response = await axiosInstance({
          //   amount: "POST",
          //   url: `/payment/create?total=${total*100}`,
          // });

          const res = await axios.post(`${baseUrl}/payment/create?total=${total * 100}`);
          const clientSecret = res.data?.clientSecret;
          // console.log(clientSecret)


          // client side or react side  have to confirmation from strip
          const {paymentIntent} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method:{
              card: elements.getElement(CardElement),
            },
          });

          //  console.log(paymentIntent)

           // after get conformation to store in firestore databse to save, clear basket after check out 
            await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
              basket:basket,
              amount:paymentIntent.amount,
              created: paymentIntent.created
            });
       // To handle Empty the basket order
            dispatch({type: Type.EMPTY_BASKET});

           setProcessing(false)
           // Navigate to order
           navigate("/orders", {state:{message:"you have placed new order"}})

      }catch (error){
        console.log(error)
        setProcessing(false)
      } 
    }

  return (
      <LayOut>
        {/* Header displaying the number of items in the basket */}
          <div className={classes.payment__header}>
            checkOut ({totalItem}) items
          </div>
          {/* payment method */}
          <section className={classes.payment}>
            {/* address */}
            <div className={classes.flex}>
              <h3>Delevery Address</h3>
              <div>
                <div>{user?.email}</div>
                <div>1300 court House</div>
                <div>Arlington, VA</div>
              </div>
            </div>
            <hr />

            {/* product */}
            <div className={classes.flex}>
              <h3>Review items and delivery</h3>
            
            <div>
             {
              basket?.map((item)=>(
              <ProductCard Product={item} flex={true}/>)
            )}
            </div>
           </div>
            <hr />

            {/* card form get from stripe for react js */}
            <div  className={classes.flex}>
              <h3>Payment Method</h3>
              <div className={classes.payment__card__container}>
                <div className={classes.payment__details}>
                  {/* payment form  function */}
                  <form onSubmit={handlePayment}> 

                    {/* display card error message */}
                    {cardError && ( <small style={{color:"red"}}>{cardError}</small>
                    )}

                     {/* stripe cardelement for card details input */}
                   <CardElement onChange={handleChange}/> 
                   <div className={classes.payment__price}>

                     <div>
                      <span style={{display: "flex", gap: "12px"}}>
                       <p>Total Order |</p> <CurrencyFormat amount={total} />{" "}
                       {/* Display total price */}
                      </span>
                     </div>

                  {/* Submit button to pay now */}
                  <button type="submit" disabled={processing}>
                    {processing ? (
                      <div className={classes.loader}>
                      <GridLoader  color="#36d7b7" size={12} />
                        <p>Please wait .... </p>
                      </div>
                    ) : (
                      "Please Pay Now"
                    )}
                  </button>
                </div>
                  </form>
                </div>

              </div>

            </div>
          
          </section>
      </LayOut>

  )
}

export default Payment   