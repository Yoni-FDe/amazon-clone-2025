/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Cart.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";



function Cart() {
  const [{ basket,user}, dispatch] = useContext(DataContext);
// a function to calculate the total price of the items in the cart
  const total = basket.reduce((amount, item)=>{
    return item.price * item.amount + amount;
  }, 0);
  console.log(basket);

//  a function to increment the amount of the item in the cart
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
//  a function to decrement the amount of the item in the cart
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  }
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          <br />
          {
            basket?.length == 0 ? (
              <p>Opps ! No item in your cart</p>):(
            basket?.map((item,i) => {
              return (
                <section className={classes.cart_product}>
                  <ProductCard
                   key={i}
                    Product={item}
                    renderDesc={true}
                    flex={true}
                    renderAdd={false}
                  />
                  <div className={classes.btn_container}>
                    <button
                      className={classes.btn}
                      onClick={() => increment(item)}
                    >
                      <IoIosArrowUp size={20} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={classes.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <IoIosArrowDown size={20} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <h3>Subtotal ({basket?.length} items)</h3>
              <p>
                <CurrencyFormat amount={total} />
              </p>
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Cart;