const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Lamsah Backend Running');
});

// رابط تسجيل الدخول عبر سلة
app.get('/auth/salla', (req, res) => {
  const authUrl = `https://accounts.salla.sa/oauth2/auth?client_id=${process.env.SALLA_CLIENT_ID}&redirect_uri=${process.env.SALLA_REDIRECT_URI}&response_type=code`;

  res.redirect(authUrl);
});

// Callback
app.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post(
      'https://accounts.salla.sa/oauth2/token',
      {
        grant_type: 'authorization_code',
        client_id: process.env.SALLA_CLIENT_ID,
        client_secret: process.env.SALLA_CLIENT_SECRET,
        redirect_uri: process.env.SALLA_REDIRECT_URI,
        code,
      }
    );

    const tokenData = response.data;

    console.log(tokenData);

    // هنا تقدر تحفظ البيانات في Supabase أو PostgreSQL

    res.send('تم ربط متجر سلة بنجاح');
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('حدث خطأ أثناء الربط');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
