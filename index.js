const express = require('express');
const { createNFT } = require('./nft');
const { LocalStorage } = require('node-localstorage');
require('dotenv').config();

const app = express();
app.use(express.json());

// Initialize local storage
const localStorage = new LocalStorage('./scratch');

app.post('/create-nft', async (req, res) => {
  const { nftName, nftDescription, nftImage } = req.body;

  try {
    const operationHash = await createNFT(nftName, nftDescription, nftImage);
    res.json({ success: true, operationHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
