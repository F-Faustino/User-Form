import express from 'express'
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql';

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'RootPass1234!',
  database : 'ff_db'
});

connection.connect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/get-countries', async (req, res) => {
    connection.query('SELECT * FROM ff_db.countries', function (error, results, fields) {
        if (error) throw error;
        return res.json(results);
    });
});

app.get('/get-users', async (req, res) => {
    console.log('tes ttes');
    connection.query('SELECT * FROM ff_db.users', function (error, results, fields) {
        if (error) throw error;
        console.log('results', results);
        return res.json(results);
    });
});

app.post('/add-user', (req, res) => {
    const { name, surname, countryId, birthday } = req.body;

    if (!name || !surname || !countryId || !birthday) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newUser = {
        id: uuidv4(),
        name,
        surname,
        countryId,
        birthday,
    };

    const data = `VALUES("${newUser.id}","${newUser.name}","${newUser.surname}",${newUser.countryId},"${newUser.birthday}");`
    connection.query('INSERT INTO `ff_db`.`users`(`id`,`name`,`surname`,`countryId`,`birthday`)' + data, function (error, results, fields) {
        if (error) throw error;
    });

    res.status(201);
});

app.listen(3001, () =>
  console.log(`Example app listening on port 3001!`),
);