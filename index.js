import express from "express";

const app = express();
app.use(express.json());

const FULL_NAME = "sanju_singh"; 
const DOB = "10112003";  
const EMAIL = "sanjusingh2472@gmail.com";
const ROLL = "22BIT0635";

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input, expected array in 'data'"
      });
    }

    let even = [];
    let odd = [];
    let alphabets = [];
    let specials = [];
    let sum = 0;

    data.forEach(item => {
      if (!isNaN(item)) {
        let num = parseInt(item);
        if (num % 2 === 0) even.push(item);
        else odd.push(item);
        sum += num;
      } else if (/^[a-zA-Z]$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        specials.push(item);
      }
    });

 
    let concatAlpha = alphabets
      .map(ch => ch.toLowerCase())
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      college_roll_number: ROLL,
      even_numbers: even,
      odd_numbers: odd,
      alphabets: alphabets,
      special_characters: specials,
      sum: sum,
      concatenated: concatAlpha
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Server error",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
