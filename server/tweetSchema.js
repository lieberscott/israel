const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  created_at: { type: String, default: "0" },
  created_at_date: { type: Date, default: new Date() },
  tweet_id: { type: String, default: "-1" },
  conversation_id: { type: String, default: "-1" },
  text: { type: String, default: "" },
  user: {
    id: String,
    name: { type: String, default: "" },
    screen_name: { type: String, default: "" },
    profile_page_url: { type: String, default: "" },
    profile_image_url: { type: String, default: "" },
    verified: { type: Boolean, default: false },
    verified_type: String
  },
  image_urls: { type: [Object], default: [] },
  thread_arr: { type: [Object], default: [] },
  video: Boolean,
  video_html: String,
  retweet_count: Number,
  likes_count: Number,
  comments_count: Number,
  impressions_count: Number,
  tweet_url: String,
  quoted: Boolean,
  quoted_tweet_data: { type: Object, default: { user: {}, unavailable: true } },
  reply: Boolean,
  in_reply_to_data: { type: Object, default: { user: {}, unavailable: true } },
  thread: Boolean,
  category: String,
  pageNum: Number
})

module.exports = mongoose.model("Tweet", tweetSchema);