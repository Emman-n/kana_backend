import express from "express";

import cors from "cors";
import mysql from 'mysql2';




const app = express();
 
app.use(express.json());
app.use(cors());

 
 
app.listen(3307, () => {
  console.log("connected to back");
});


 
// const db = mysql.createConnection({
//   host: '34.122.62.247',
//   user: 'root',
//   password: 'root',
//   database: 'hiradata',
//   authPlugins: {
//     mysql_clear_password: () => () => Buffer.from('root')
//   }
// });


// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err.message);
//     return;
//   }
//   console.log('Connected to MySQL');
// });


// app.get("/", (req, res) => {
//   const sql= "SELECT * FROM hira";

//   db.query(sql,(err,result)=>{
//     if (err) return res.json({Message:"fuuuuck"})
//     return res.json(result);
//   })
//  });

 
// app.get("/", (req, res) => {
//   res.json("hello this is the backend :O");
// });


// //--------------------------------------
// function findResponseHira(req, res) {
//   const hiraId = req.params.id; // Extract the parameter from the request

//   const sql = `SELECT * FROM hiradata.hira WHERE id = 1`;
//   db.query(sql, [hiraId], (err, data) => {
//     if (err) {
//       return res.json(err);
//     }else{
//       return res.status(200).json(data);
//     }
 
//   });
// }
// //---------------------------------------
// app.get("/hira/:id", (req, res) => {
//   findResponseHira(req, res);
// });


//--------------------------------------
// function findResponseKata(req, res) {
//   const hiraId = req.params.id; // Extract the parameter from the request

//   const sql = `SELECT * FROM kata WHERE id = ?`;
//   db.query(sql, [hiraId], (err, data) => {
//     if (err) {
//       return res.json(err);
//     }else{
//       return res.status(200).json(data);
//     }
 
//   });
// }
// //---------------------------------------
// app.get("/kata/:id", (req, res) => {
//   findResponseKata(req, res);
// });




// //---------------------------------------
// app.get("/hira", (req, res) => {
//   const q = `SELECT * FROM hira `;
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });
// //---------------------------------------
// app.get("/kata", (req, res) => {
//   const q = `SELECT * FROM kata `;
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// //---------------------------------
// app.get("results/:id", (req, res) => {
//   const sql = `SELECT * FROM hira where id= ? `;
//   const id = req.params.id;
//   db.query(sql,[id], (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// app.get("/hira/:id", (req, res) => {
//   const q = `SELECT * FROM hira where = ${req}`;
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });


 



