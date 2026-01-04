const express =require("express");
const cors=require("cors");
const {initDB}=require('./database/schema');
const app=express();

app.use(cors());
app.use(cors({
  origin: 'https://courses-energytec-8.onrender.com/',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes=require("./routes/userRoutes")
const courseRoutes=require("./routes/courseRoutes")

//initialize the DB
initDB();


app.use("/api/users",userRoutes);
app.use("/api/courses",courseRoutes);


app.listen(3000,()=>{
    console.log("server is listening at port 3000");
})