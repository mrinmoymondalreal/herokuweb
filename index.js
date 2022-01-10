const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const short_url = require('./conn_files/short_urls')
const users_conn = require('./conn_files/user_conn');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var cors = require('cors')
const { create } = require('express-handlebars');
const QRCode = require('qrcode')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

const app = express();
const PORT = 8000;

const hbs = create({
  extname: 'hbs',
  layout: 'index',
  helpers: {
    // foo(){return "KOOO";}
  }
});

app.set('view engine', 'hbs');

app.engine('hbs', hbs.engine );
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'layout')));
app.use("/static",express.static(path.join(__dirname, 'static')));
app.use(express.json());

var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });
app.use(parseForm);
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:8000",
  credentials: true,
}

app.use(cors(corsOptions));

app.get('/:file', csrfProtection, (req, res)=>{
  res.render(req.params.file.replace('favicon.ico',"").replace('.html', ''), {
    layout: false,
    csrfToken: req.csrfToken(),
  });
});

app.get('/', csrfProtection, async (req, res)=>{
  res.render('index', {
    layout: false,
    csrfToken: req.csrfToken(),
  });
});

app.get('/s/:link', async (req, res)=>{
  const result = await short_url.findUrl(req.params.link);
  if(result.status == 200){
    const {main_url, package_name, isAppOpener} = result;
    res.render('redirect_page', {
      layout: false,
      main_url: main_url,
      package_name: package_name,
      isAppOpener: isAppOpener
    });
  }else{
    res.send(result);
  }
});

app.get('/:number/:link', async (req, res)=>{
  const result = await short_url.findUrl(req.params.link);
  if(typeof result == 'string'){
    res.redirect(result);
  }else{
    res.send(result);
  }
});

app.post('/a/loginreq', parseForm, csrfProtection, async (req, res)=>{
  try{
    const result = await users_conn.checkUsr(req.body.usr, req.body.pwd, JWT_SECRET);
    res.send(result);
  }catch{
    res.send("Internal server error");
  }

});

app.post('/a/signupreq', parseForm, csrfProtection, async (req, res)=>{
  try{
    const { usr: username, pwd, email, name, number: mob } = req.body;
    const result = await users_conn.addUsr(username, pwd, email, name, mob);
    res.send(result);
  }catch{
    res.send("Internal Server Error");
  }
});

app.post('/a/addUrl', parseForm, csrfProtection, async (req, res)=>{
  try{
    const { url, id, usr } = req.body;
    const result = await short_url.addUrl(url, 4, false, id);
    res.send(result);
  }catch{
    res.send("Internal Server Error");
  }
});

app.post('/getList', parseForm, csrfProtection, async (req, res)=>{
  try{
    const { user } = req.body;
    const result = await short_url.addUrl(url, 4, false, id);
    res.send(result);
  }catch{
    res.send("Internal Server Error");
  }
});

app.post('/a/getCsrf', csrfProtection, function (req, res) {
  res.render('/login', { csrfToken: req.csrfToken() });
  console.log(req.csrfToken());
});

app.post('/a/getqr', parseForm, csrfProtection, function (req, res) {
  try{
    QRCode.toDataURL(req.body.url, function (err, code) {
      if(err) return console.log("error occurred")
      res.send(code);
    })
  }catch{
    res.send("Internal Server Error");
  }
});

app.listen(PORT, "0.0.0.0", ()=>{
  console.log("Server is working on " + PORT);
});