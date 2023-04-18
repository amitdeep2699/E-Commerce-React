const { Pool, Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'e-commerce',
    password: 'admin',
    port: 5432,
  })
async function initDb(){
  client.connect(function(err){
    if(err) throw err;
    else{
      console.log("Pg SQL Database are connected");
    }
  });
}
module.exports={initDb:initDb,client:client}