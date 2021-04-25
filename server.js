const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { exec } = require("child_process");
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
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
    console.log(`stdout: ${stdout}`);
    readline.question(`Reply`, name => {
        //console.log(`Hi ${name}!`)
        exec("cat chat.txt >> Rohit : "+ name +" || cat chat.txt", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            return res.render('chat.ejs', {data : JSON.stringify(stdout) });
        });
        readline.close();
      });
});
res.send('Hello World!');
});

app.post('/reply', (req, res) => {
    var reply = req.body.reply;
    exec("cat chat.txt >> Person : "+ reply , (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        return res.redirect('/');
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})