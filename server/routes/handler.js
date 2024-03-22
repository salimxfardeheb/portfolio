const express = require("express");
const router = express.Router();

router.get('/tweets', (req, res) => {
  const str = [
    {
     "name": "salim Fardeheb",
      "job": "web Dev",
      "age": 23,
    }
  ];
  res.end(JSON.stringify(str));
});

router.post('/add', (req, res) => {
  res.end("SA");
});

module.exports = router;