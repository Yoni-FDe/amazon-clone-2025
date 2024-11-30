// create signup function 
import React, { useState,useContext} from 'react'
import classes from "./SignUp.module.css"
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {auth} from "../../Utility/firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword}  from "firebase/auth"
import { Type } from '../../Utility/action.type';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import {ClipLoader} from 'react-spinners'
// import LayOut from '../../Components/LayOut/LayOut'

function Auth() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState({
    signIn:false, // is not loading
    signUp:false
   })

   const [{user},dispatch] = useContext(DataContext)
   const navigate = useNavigate()
   console.log(user)

   const navStateData = useLocation()
   console.log(navStateData)

   const authHandler = async(e)=> {
    e.preventDefault()
     console.log(e.target.name);
     if(e.target.name === "Sign In"){
      // Firebase
      setLoading({...loading, signIn:true}) // loading only a true , then its scessfull
    signInWithEmailAndPassword(auth, email, password).then((userInfo)=>{
      // console.log(userInfo);
      dispatch({
        type:Type.SET_USER,
        user:userInfo.user
      })
      setLoading({...loading, signIn:false}) // set up loading false which is loading stop
       navigate(navStateData?.state?.redirect ||"/") //navigate to home page after signIn
    }).catch((err)=> {
      // console.log(err.message);
      setError(err.message)
    })
     }else{
   createUserWithEmailAndPassword(auth, email, password).then((userInfo)=>{
    // console.log(userInfo);
    setLoading({...loading, signUp:false})
    navigate(navStateData?.state?.redirect || "/"); // navigate to home after signUp
     dispatch({
        type:Type.SET_USER,
        user:userInfo.user
      })

   }).catch((err)=>{
      // console.log(err);
      setError(err.message)
      setLoading({...loading, signUp:false})
      
   })
     }
    
   };

  //  console.log(password, email);
   

  return (
      <section className={classes.login}>
        {/* amazon log */}
        <Link to={"/"}>
         <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png' alt=''/>
        </Link>

        {/* form section  */}
        <div className={classes.login__container}>
          <h1>Sign In</h1>
          {navStateData?.state?.message && (
            <small style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold"
            }}>
              {navStateData?.state?.message}
            </small>
          )

          }
          <form action="">
            <div>
              <label htmlFor="email">Email</label>
              {/* This kind of set up is called control set up beacose we use useState*/}
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email"/>
            </div>
            <div>
              <label htmlFor="passsword">Password</label>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" />
            </div>
              <button type='submit' onClick={authHandler} name="Sign In" className={classes.login__signInButton}
              >{
                loading.signIn ? (
                <ClipLoader color="green" size={20}></ClipLoader>
                ) : ( "Sign In"
                 )}
                </button>
          </form>
            {/* please check the agreement */}
            <p>
              By signing-in you agree to the AMAZON FACK CLONE condition of use & 
              sale. Please see our privacy notice, our cookies notice and our 
              Interest-Based ads Notice.
            </p>
            {/* create account but */}
            <button type='submit' onClick={authHandler} className={classes.login__registerButton}>
                {
                loading.signUp ? (
                <ClipLoader color="green" size={20}></ClipLoader>
                ) : ( "Create your Amazon Account"
                 )}
               </button>
            {error && <small style={{paddingTop:"6px", color:"red"}}>{error}</small>}
        </div>
      </section>
        
  );
}

export default Auth;

