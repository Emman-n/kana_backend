import express from "express";
import mysql from "mysql";
import cors from "cors";
import fs from "fs";



const app = express();
app.use(express.json());

const allowedOrigins = JSON.parse(fs.readFileSync('./config/allowedOrigins.json')).allowedOrigins;


app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));



const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
});



const port = 3307;
app.listen(port, () => {
  console.log(`connected to back ${port}`);
});


// app.listen(3307, () => {
//   console.log("connected to back");
// });


app.get("/", (req, res) => {
  res.json("hello this is the backend :O");
});

 
app.get("/books", (req, res) => {
  const q = `SELECT * FROM books `;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/vocab", (req, res) => {
  const sql = `SELECT * FROM vocab `;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


let previousRndInt;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//---------------------------------------
app.get("/read/:id", (req, res) => {
  findNonEmptyResponse(req, res);
});


function findNonEmptyResponse(req, res) {
  let rndInt;

  do {
    rndInt = randomIntFromInterval(1, 12);
  } while (rndInt === previousRndInt); // Keep generating until it's different from the previous

  previousRndInt = rndInt; // Update the previousRndInt

  console.log(rndInt);

  const q = `SELECT * FROM books WHERE id = ${rndInt}`;
  db.query(q, [rndInt], (err, data) => {
    if (err) {
      return res.json(err);
    }

    if (data && data.length > 0) {
      return res.json(data);
    } else {
      // If the response is empty, try again.
      return findNonEmptyResponse(req, res);
    }
  });
}

//--------------------------------------
// function findResponseVocab(req, res) {
//   let rndInt;

//   do {
//     rndInt = randomIntFromInterval(1, 12);
//   } while (rndInt === previousRndInt); // Keep generating until it's different from the previous

//   previousRndInt = rndInt; // Update the previousRndInt

//   console.log(rndInt);

//   const q = `SELECT * FROM vocab WHERE id = ${rndInt}`;
//   db.query(q, [rndInt], (err, data) => {
//     if (err) {
//       return res.json(err);
//     }

//     if (data && data.length > 0) {
//       return res.json(data);
//     } else {
//       // If the response is empty, try again.
//       return findResponseVocab(req, res);
//     }
//   });
// }
//--------------------------------------
function findResponseVocab(req, res) {
  const vocabId = req.params.id; // Extract the parameter from the request

  const q = `SELECT * FROM hira WHERE id = ?`;
  db.query(q, [vocabId], (err, data) => {
    if (err) {
      return res.json(err);
    }else{
      return res.status(200).json(data);
    }
 
  });
}
//---------------------------------------
app.get("/hira/:id", (req, res) => {
  findResponseVocab(req, res);
});


//--------------------------------------
function findResponseHira(req, res) {
  const hiraId = req.params.id; // Extract the parameter from the request

  const sql = `SELECT * FROM hira WHERE id = ?`;
  db.query(sql, [hiraId], (err, data) => {
    if (err) {
      return res.json(err);
    }else{
      return res.status(200).json(data);
    }
 
  });
}
//---------------------------------------
app.get("/hira/:id", (req, res) => {
  findResponseHira(req, res);
});


//--------------------------------------
function findResponseKata(req, res) {
  const hiraId = req.params.id; // Extract the parameter from the request

  const sql = `SELECT * FROM kata WHERE id = ?`;
  db.query(sql, [hiraId], (err, data) => {
    if (err) {
      return res.json(err);
    }else{
      return res.status(200).json(data);
    }
 
  });
}
//---------------------------------------
app.get("/kata/:id", (req, res) => {
  findResponseKata(req, res);
});




//---------------------------------------
app.get("/hira", (req, res) => {
  const q = `SELECT * FROM hira `;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//---------------------------------------
app.get("/kata", (req, res) => {
  const q = `SELECT * FROM kata `;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


//---------------------------------

app.get("results/:id", (req, res) => {
  const sql = `SELECT * FROM hira where id= ? `;
  const id = req.params.id;
  db.query(sql,[id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});




app.get("/hira/:id", (req, res) => {
  const q = `SELECT * FROM hira where = ${req}`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


//----------------------------------------------
// app.get("/vocab/:id",(req, res)=>{
//       const rndInt = 1;
//       console.log(rndInt)

//     const q = `SELECT * FROM vocab WHERE id = ${rndInt}`;
//        //const bookId= req.params.id;
//     db.query(q,[rndInt],(err,data)=>{
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })


//-----------------------------------------------
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been created");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been deleted");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`= ?, `desc`=?,`price`=?, `cover`=? WHERE id=?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been updated");
  });
});


 
