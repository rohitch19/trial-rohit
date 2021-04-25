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
    console.log(`first one stdout: ${stdout}`);
    readline.question(`Reply : `, name => {
        exec("echo "+"Rohit : "+name+">> chat.txt", (error, stdout2, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log("msg entered");
        });
        readline.close();
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
     res.render('chat.ejs', {data :stdout.split('\n')});
        })
    })
    })
    
      
        //console.log(`Hi ${name}!`)
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
        return res.redirect('/');
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
