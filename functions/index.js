const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express =require("express");
const cors = require("cors");
const {setGlobalOptions} =require("firebase-functions");
const dotenv = require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express()
setGlobalOptions({maxInstances: 10})
app.use(cors({origin:true}));

app.use(express.json());

app.get("/", (req, res) =>{
    res.status(200).json({
        message: "Success",
    });
});


//Test for payment made 
app.post("/payment/create", async(req, res)=> {
    const total = parseInt(req.query.total); // This reuest from client side
    if(total > 0) {
        // console.log("payment recived", total); // if this total payment to send to stripe
        // res.send(total);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd",    
        });
        console.log(paymentIntent);

        res.status(201).json({
            clientSecret: paymentIntent.client_secret, // This is client payment request
        })

        res.status(201).json(paymentIntent);
    }else{
        res.status(403).json({
            message: "total must be greater than 0"
        });
   }
});


exports.api = onRequest(app) // This is serve by firebase function at backend 

// emulators:start is a command line for database
// let start run app use this command npm run serve
// we get message: "Success",
