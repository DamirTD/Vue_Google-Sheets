const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const key = require('./tactical-snow-399606-4b5c21a01183.json');
const client = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

app.post('/submit-form', async (req, res) => {
    try {
        const sheets = google.sheets({ version: 'v4', auth: client });

        const spreadsheetId = '1YEknaAQ6bPlb_DvAs2oTdU7348hqYOKFbwt4cpG05us';
        const range = 'Лист1!A1:D1';// Исправляем диапазон

        const values = [
            [req.body.login, req.body.email, req.body.name, req.body.lastName]
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: range,
            valueInputOption: 'RAW',
            resource: {
                values: values
            }
        });

        res.status(200).send('Form data received successfully!');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
