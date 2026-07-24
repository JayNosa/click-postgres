const express = require("express");
const { Pool } = require("pg");

const app = express();

app.use(express.json());
app.use(express.static("public"));


const pool = new Pool({

    user: "u0_a352",
    host: "localhost",
    database: "myapp",
    port: 5432

});

// Save quiz result

app.post("/save-result", async(req,res)=>{

    const {
        name,
        className,
        score,
        percentage,
        grade
    } = req.body;


    try{

        await pool.query(

        `INSERT INTO results
        (student_name,
        student_class,
        score,
        percentage,
        grade)

        VALUES($1,$2,$3,$4,$5)`,

        [
          name,
          className,
          score,
          percentage,
          grade
        ]);


        res.json({
            message:"Result saved"
        });


    }catch(error){

        console.log(error);

        res.status(500).json({
            message:"Database error"
        });

    }

});



// view results

app.get("/results", async(req,res)=>{

const data =
await pool.query(
"SELECT * FROM results ORDER BY id DESC"
);


res.json(data.rows);

});



app.listen(3000,()=>{

console.log(
"Server running on port 3000"
);

});
