const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const Tweet = require("./tweetSchema.js");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASS}@cluster0.6wfov.mongodb.net/test`)
.then(() => {
  console.log("mongoose connected");
})
.catch((err) => console.log("err : ", err));

// PWAs want HTTPS!
function checkHttps(request, response, next) {
  // Check the protocol — if http, redirect to https.
  if (request.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    response.redirect("https://" + request.hostname + request.url);
  }
}

app.all("*", checkHttps);

app.post("/api/get_home_images", (req, res) => {
  console.log("get home images");
  const category = req.body.category;
  console.log("category : ", category);
  fs.readFile(`/app/home_images/${category}.json`, 'utf-8', (err, data) => {
    if (err) {
      return res.json({ error: true });
    }
        
    return res.json({ data: JSON.parse(data) });
  });
});

app.post("/api/tweets_by_category", async (req, res) => {
  const category = req.body.category;
  const skip = req.body.skip;
  

  const tweets = await Tweet.find({ category }).sort({ created_at: 1 }).skip(skip).limit(10).lean().exec();

  console.log("tweets : " ,tweets);
  
  return res.json({ tweets })

});



// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
