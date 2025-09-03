const express = require('express');
require('dotenv').config();
require('./config/configure');
const cors = require('cors');
const routes = require('./routes/index')
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/taskRoutes')

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});



const app = express();
app.use(limiter);


const cors = require('cors');
const allowedOrigins = [
  'http://localhost:5173',
  'https://taskmanager-ayushbansal.netlify.app',  // 👈 add your Netlify frontend here
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});




app.use(express.json());
app.use('/api',routes);
app.use('/api/auth',authRoutes);
app.use('/api/tasks',taskRoutes);







app.get('/',async(req,res)=>{
    res.send("Api is running");
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})
