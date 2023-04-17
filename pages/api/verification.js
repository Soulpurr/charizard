import ConnectToMongo from "../../middleware/mongoose"
import Orders from "../../models/orders"
var crypto = require("crypto");

const handler=async(req,res)=> {
    const verify=crypto.createHmac('sha256','12345678')
    verify.update(JSON.stringify(req.body))
    const digest=verify.digest('hex')
    console.log(digest,req.headers['x-razorpay-signature'],)
    if (digest==req.headers['x-razorpay-signature']) {
        let order=await Orders.findOneAndUpdate({orderId:req.body.payload.payment.entity.order_id},{status:"Paid"})
        let orders=await Orders.findOneAndUpdate({orderId:req.body.payload.payment.entity.order_id},{paymentInfo:req.body})
       
    }
    else{
        res.send("Tampering not allowed sir/mam")
    }
    // res.redirect('/')
    console.log(req.body)
 res.json('SEND')
}
export default ConnectToMongo(handler);