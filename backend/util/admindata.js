const { initDb, client } = require("../database/init")
const addProduct = async function (items, callback) {
    client.query(`insert into products(product_image,name,quantity,prices,description,seller_name,delete_status) values('${items.image}',
    '${items.product_name}',
    ${items.quantity},
    ${items.price},
    '${items.description}',
    '${items.seller}',
    ${false})`, (err, res) => {
        if (err) {
            console.log(err)
            callback("some went is wrong");
        } else {
            callback(null);
        }
    })
}
const addProductfileAdmin = async function (items, callback) {
    try {
        await client.query('BEGIN');
        for (let i = 0; i < items.length; i++) {
            let e = items[i];
            await client.query(`insert into products(product_image,name,quantity,prices,description,seller_name,delete_status) values('${e.product_image}',
            '${e.name}',
            ${e.quantity},
            ${e.prices},
            '${e.description}',
            '${e.seller_name}',
            ${false})`)
        }
        await client.query('COMMIT');
        callback(null);
    } catch (err) {
        await client.query('ROLLBACK');
        // callback(null);
    }
}
const addProductfileSeller=async function (items,seller_name, callback) {
    // console.log(seller_name);
    try {
        await client.query('BEGIN');
        for (let i = 0; i < items.length; i++) {
            let e = items[i];
            // console.log(e);
            await client.query(`insert into products(product_image,name,quantity,prices,description,seller_name,delete_status) values('${e.product_image}',
            '${e.name}',
            ${e.quantity},
            ${e.prices},
            '${e.description}',
            '${seller_name}',
            ${false})`)
        }
        await client.query('COMMIT');
        callback(null);
    } catch (err) {
        await client.query('ROLLBACK');
        callback(err);
    }
}
const getAllProduct = async function (limitdata, callback) {
    let { page, limit } = limitdata;
    let skip = (page - 1) * limit;
    client.query(`select * from products where delete_status=${false} order by product_id limit ${limit} offset ${skip}`, (err, data) => {
        if (err) {
            console.log(err)
            callback("some went is wrong");
        } else {
            callback(null, data.rows);
        }
    })
}
const updateProduct = async function (items, id, callback) {
    client.query(`update products set name='${items.name}',quantity=${items.quantity},prices=${items.prices},
    description='${items.description}',seller_name='${items.seller_name}',delete_status=${false} where product_id='${id}'`, (err, res) => {
        if (err) {
            console.log(err)
            callback("some went is wrong");
        } else {
            callback(null);
        }
    })
}
const deleteProduct = async function (id, callback) {
    client.query(`update products set delete_status=${true} where product_id='${id}'`, (err, res) => {
        if (err) {
            console.log(err)
            callback("some went is wrong");
        } else {
            callback(null);
        }
    })
}
const getSellerAllProduct = async function (seller_name, limitdata, callback) {
    let { page, limit } = limitdata;
    let skip = (page - 1) * limit;
    client.query(`select * from products where delete_status=${false} and seller_name='${seller_name}' order by product_id limit ${limit} offset ${skip}`, (err, data) => {
        if (err) {
            console.log(err)
            callback("some went is wrong");
        } else {
            callback(null, data.rows);
        }
    })
}
module.exports = { addProduct: addProduct, addProductfileAdmin:addProductfileAdmin,addProductfileSeller:addProductfileSeller, getAllProduct: getAllProduct, updateProduct: updateProduct, deleteProduct: deleteProduct, getSellerAllProduct: getSellerAllProduct };