const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors')
const csv = require('csvtojson');
const bodyParser = require('body-parser');
let port = process.env.PORT || 8000
const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res)=>{
  res.send('live')
})
app.post('/json', upload.single('file'),async(req, res)=>{
  let list_csv = await csv().fromString(req.file.buffer.toString());
    list_csv = JSON.stringify(list_csv);
    list_csv = JSON.parse(list_csv);
    let lgmv = 0;
    let cgmv = 0;

    let total_last_cb = 0;
    let cb_earn_last_total = 0;
    let cb_burn_last_total = 0;

    let total_cb = 0;
    let cb_earn_total = 0;
    let cb_burn_total = 0;

    list_csv.forEach((item, i) => {
      console.log(item['MTD-GMV'], "item['MTD-GMV']");
      lgmv += parseInt(item['LMTD-GMV'])
      cgmv += parseInt(item['MTD-GMV'])

      total_last_cb += parseInt(item['LMTD-CBEarn'])+ parseInt(item['LMTD-SCBurn'])
      cb_earn_last_total += parseInt(item['LMTD-CBEarn'])
      cb_burn_last_total += parseInt(item['LMTD-CBEarn'])

      total_cb += parseInt(item['MTD-CBEarn'])+ parseInt(item['MTD-SCBurn'])
      cb_earn_total += parseInt(item['MTD-CBEarn'])
      cb_burn_total += parseInt(item['MTD-SCBurn'])
    });

    return res.json({data:list_csv,lgmv, cgmv, current:{total:total_cb,earn:cb_earn_total,burn:cb_burn_total}, last:{total:total_last_cb,earn:cb_earn_last_total,burn:cb_burn_last_total} ,status:"200"})
})


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
