import React, { useContext,useState, useEffect } from 'react'
import classes from './Orders.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import {db} from '../../Utility/firebase'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'


function Orders() {

  const [{user}, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([])

  useEffect(()=> {
    if(user){
    db.collection("users")
      .doc(user.uid)
      .collection("orders")
      .orderBy("created","desc")
      .onSnapshot((Snapshot)=> {
        console.log(Snapshot)
        setOrders(
          Snapshot.docs.map((doc)=>({
            id:doc.id,
            data:doc.data()
          }))
        )
      })
    }else{
      setOrders([]) //empety orders
    }

  },[]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
           <h2>Your Orders</h2>
           {/* if don't have order to show this message */}
               {
                orders?.length == 0 && <div style={{padding: "30px"}}>You don't have orders yet.</div>
               } 
           {/* orders item list */}
           <div>
             {
               orders?.map((eachOrder,i)=> {
                return (
                  <div key={i}>
                    <hr />
                    <p>order ID: {eachOrder?.id}</p>
                    {
                      eachOrder?.data?.basket?.map(order =>(
                        <ProductCard
                         flex={true}
                         Product={order}
                         key={order.id}
                        />
                     ))}
                  </div>
                )
               })
              }
           </div>
        </div>
           
      </section>
         
    </LayOut>
      
   
  )
}

export default Orders
