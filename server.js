const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const fs = require('fs');

const Tweet = require("./mongoose/tweetSchema.js");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    const list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

app.post("/api/get_home_images", (req, res) => {
  const category = req.body.category;
  fs.readFile(`./home_images/${category}.json`, 'utf-8', (err, data) => {
    if (err) {
      return res.json({ error: true });
    }
    
    return res.json({ data: JSON.parse(data) });
  });
});

app.get("/add_to_mongo", async (req, res) => {
  console.log("add to mongo!");
  fs.readdir("./2_second_round", async (err, files) => {
    let newStr = "";
    files.forEach(async (file) => {
      const data = fs.readFileSync(`./2_second_round/${file}`);
      const str = data.toString();
      
      const json = JSON.parse(str);

      await Tweet.insertMany(json);
      console.log("finished ", file);
    });

    return res.json({ finished: true });
  });
});

app.post("/api/tweets_by_category", async (req, res) => {
  const category = req.body.category;
  const skip = req.body.skip;

  const tweets = await Tweet.find({ category }).sort({ created_at: 1 }).skip(skip).limit(10).lean().exec();

  return res.json({ tweets })

});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
mongoose.connect("mongodb://localhost:27017/israel")
.then(() => {
  console.log("mongoose connected");
  app.listen(port);
  console.log('App is listening on port ' + port);
})
.catch((err) => console.log(err));
