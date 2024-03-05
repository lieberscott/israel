const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const fs = require('fs');
require("dotenv").config();

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
  fs.readdir("./1_first_round", async (err, files) => {
    let newStr = "";
    files.forEach(async (file) => {
      const data = fs.readFileSync(`./1_first_round/${file}`);
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

  console.log("category : ", category);

  const tweets = await Tweet.find({ category }).sort({ created_at: 1 }).skip(skip).limit(10).lean().exec();

  console.log("tweets.length : ", tweets.length);

  return res.json({ tweets })

});

app.post("/api/recategorize", async (req, res) => {
  const category = req.body.category;
  let tweetData = req.body.tweetData;

  tweetData.category = category;

  const str = "," + JSON.stringify(tweetData, null, 2);

  fs.appendFile(`./3_rearranged_tweets/${category}.json`, str, (err) => {
    if (err) {
      console.log("by_page_num error : ", err);
      return res.json({ ok: false })
    }
    console.log(`added to ${category}`);
    return res.json({ ok: true });
  })
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
// mongoose.connect("mongodb://localhost:27017/israel")
mongoose.connect(`mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASS}@cluster0.6wfov.mongodb.net/`)
.then(() => {
  console.log("mongoose connected");
  app.listen(port);
  console.log('App is listening on port ' + port);
})
.catch((err) => console.log(err));
