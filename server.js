const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { exec } = require("child_process");
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000
  
  app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    exec("cat chat.txt", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
    res.render('chat.ejs', {data : stdout.split('\n')});
})
});

app.post('/reply', (req, res) => {
    var reply = req.body.reply;
    exec("echo "+"Person : "+reply+">> chat.txt", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        exec("cat chat.txt", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
        console.log("data ==============" + stdout);
        res.render('chat.ejs', {data : stdout.split('\n')});
    })
})
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
