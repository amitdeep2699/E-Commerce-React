const { initDb, client } = require("../database/init")
const addToCart = async function (username, newData, callback) {
    client.query(`select * from carts where username='${username}' and product_id=${newData.product_id}`, (err, res) => {
        if (err) {
            console.log(err)
            callback("Some this went wrong");

        } else if (res.rows.length > 0) {
            client.query(`select quantity from products where product_id=${newData.product_id}`)
                .then((data) => {
                    let product_quantity = data.rows[0].quantity;
                    client.query(`update carts set quantity=quantity+1 where username='${username}' and product_id=${newData.product_id} and quantity<'${product_quantity}'`, (err, res) => {
                        if (err) {
                            callback(err, "some went is wrong");

                        } else {
                            callback(null);
                        }
                    })
                })
                .catch((err) => {
                    callback("some went is wrong");
                })
        } else {
            client.query(`insert into carts(username,product_id,quantity,seller_name) 
            values('${username}',${newData.product_id},${1},'${newData.seller_name}')`, (err, res) => {
                if (err) {
                    callback("some went is wrong");

                } else {
                    callback(null);
                }
            })
        }
    })
}
const getCartData = async function (username, limitdata, callback) {
    let { page, limit } = limitdata;
    let skip = (page - 1) * limit;
    client.query(`select *,carts.quantity as cart_quantity from carts inner join products on carts.product_id=products.product_id where carts.username='${username}' limit ${limit} offset ${skip}`, (err, data) => {
        if (err) {
            callback(err, "something went wrong");
        } else {
            callback(null, data.rows)
        }
    })
}
const getAllCartData = async function (username, callback) {
    client.query(`select *,carts.quantity as cart_quantity from carts inner join products on carts.product_id=products.product_id where carts.username='${username}'`, (err, data) => {
        if (err) {
            callback(err, "something went wrong");
        } else {
            callback(null, data.rows)
        }
    })
}
const deleteCartData = async function (username, product_id, callback) {
    client.query(`delete from carts where username='${username}' and product_id=${product_id}`, (err, data) => {
        if (err) {
            callback(err, "something went wrong");
        } else {
            callback(null)
        }
    })
}

const updateCartQuantity = async function (username, details, callback) {
    if (details.msg === 'inc') {
        let product_quantity;
        client.query(`select quantity from products where product_id=${details.id}`)
            .then((data) => {
                product_quantity = data.rows[0].quantity;
                client.query(`update carts set quantity=quantity+1 where username='${username}' and product_id=${details.id} and quantity<${product_quantity}`, (err, data) => {
                    if (err) {
                        callback(err, "something went wrong");
                    } else {
                        if (data.rowCount == 0) {
                            callback(null, { msg: "maxquant", quant: product_quantity });
                        } else {
                            callback(null, { msg: "", quant: product_quantity })
                        }
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            })

    } else {
        client.query(`update carts set quantity=quantity-1 where username='${username}' and product_id=${details.id}`, (err, data) => {
            if (err) {
                callback(err, "something went wrong");
            } else {
                callback(null, { msg: "", quant: "" })
            }
        })
    }
}
const  checkOutBeforPay= async function(username,callback){
    client.query(`select *,carts.quantity as cart_quantity from carts inner join products on carts.product_id=products.product_id where carts.username='${username}'`, (err, data) => {
        if (err) {
            callback(err, "something went wrong");
        } else {
            let t_prices=0;
            data.rows.forEach((e)=>{
                let p_quant=parseInt(e.quantity);
                let cart_quant=parseInt(e.cart_quantity);
                if(p_quant>=cart_quant){
                    t_prices+=(e.cart_quantity*e.prices);
                }else{
                    callback(null,{'t_prices':0})
                }
            })
            callback(null,{'t_prices':t_prices});
        }
    })
}
const checkOut = async function (username,pay_id, callback) {
    let order_data;
    client.query(`select *,carts.quantity as cart_quantity from carts inner join products on carts.product_id=products.product_id where carts.username='${username}'`, async (err, data) => {
        if (err) {
            callback(err, "something went wrong");
        } else if (data.rows.length > 0) {
            order_data = data.rows;
            try {
                await client.query('BEGIN');
                for(let i=0;i<order_data.length;i++){
                    let e = order_data[i];
                        await client.query(`update products set quantity=quantity-${e.cart_quantity} where product_id=${e.product_id}`);
                        await client.query(`insert into orders (seller_name,user_name,product_id,quantity,total_price,payment_id) values('${e.seller_name}',
                            '${e.username}',${e.product_id},${e.cart_quantity},${e.cart_quantity * e.prices},'${pay_id}')`);
                        await client.query(`delete from carts where product_id=${e.product_id} and username='${e.username}'`);
                    }
                    // console.log(pay_id);
                await client.query('COMMIT');
                callback(null,"success");
            } catch(err) {
                console.log(err);
                await client.query('ROLLBACK');
                callback("fail",null);
            }
            // order_data.forEach(async (e)=>{
            //     try{
            //         await client.query('BEGIN');
            //         await client.query(`update products set quantity=quantity-${e.cart_quantity} where quantity>=${parseInt(e.cart_quantity)} and product_id='${e.product_id}'`);
            //         await client.query(`insert into orders (seller_name,user_name,product_id,quantity,total_price) values('${e.seller_name}',
            //         '${e.username}','${e.product_id}',${e.cart_quantity},${e.cart_quantity*e.prices})`);
            //         await client.query(`delete from carts where product_id='${e.product_id}' quantity<=(select qunatity form products where product_id='${e.product_id})'`);
            //         await client.query('COMMIT');
            //     }
            //     catch(err){
            //         await client.query('ROLLBACK');
            //         console.log(err);
            //     } 
            // })
            
        }
    })
}

const getAllUserOrderData = async function (username, callback) {
    client.query(`select O.*,P.*,O.quantity as order_qunatity from orders as O inner join products as P on O.product_id=P.product_id where O.user_name='${username}' order by O.order_id desc`, (err, data) => {
        if (err) {
            callback(err, "something went wrong");
        } else {
            callback(null, data.rows)
        }
    })
}
const getAllSellerOrderData=async function (username, callback) {
    client.query(`select O.*,P.*,O.quantity as order_qunatity from orders as O inner join products as P on O.product_id=P.product_id where O.seller_name='${username}' order by O.order_id desc`, (err, data) => {
        if (err) {
            callback(err, "something went wrong");
        } else {
            callback(null, data.rows)
        }
    })
}

module.exports = { addToCart: addToCart, getCartData: getCartData, deleteCartData: deleteCartData, updateCartQuantity: updateCartQuantity, getAllCartData: getAllCartData, checkOut: checkOut ,checkOutBeforPay:checkOutBeforPay,getAllUserOrderData:getAllUserOrderData,getAllSellerOrderData:getAllSellerOrderData};