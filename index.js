const express = require('express');
const app = express();
const port = 5000;

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    const dynamicContent = "Welcome to the Music Festival!";
    res.render('index', { content: dynamicContent });
  });
  
  app.get('/lineup', (req, res) => {
    res.render('lineup');
  });
  
  app.get('/stages', (req, res) => {
    res.render('stages');
  });
  
  app.get('/faq', (req, res) => {
    res.render('faq');
  });
  
  app.get('/contact', (req, res) => {
    res.render('contact');
  });
  
  app.get('/activity', (req, res) => {
    res.render('activity');
  });
  
  app.use(express.static('public'));

// API route for the interactive feature (guess the number)
app.get('/api/guessNumber', (req, res) => {
    const userGuess = parseInt(req.query.guess, 10);
    const randomNumber = Math.floor(Math.random() * 10) + 1;
  
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
      res.json({ message: 'Please enter a valid number between 1 and 10.' });
    } else if (userGuess === randomNumber) {
      res.json({ message: 'Congratulations! You guessed the correct number.' });
    } else {
      res.json({ message: `Sorry, the correct number was ${randomNumber}. Try again!` });
    }
  });
  
  

// API routes for AJAX
app.get('/api/lineup', (req, res) => {
  db.all('SELECT * FROM lineup', (err, rows) => {
    if (err) {
      console.error('Error fetching lineup data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/stages', (req, res) => {
  db.all('SELECT * FROM stages', (err, rows) => {
    if (err) {
      console.error('Error fetching stages data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/interactiveFeature', (req, res) => {
  // Simulate some interactive feature (replace this with your logic)
  res.send('AJAX feature worked!');
});

app.post('/contact', express.urlencoded({ extended: true }), (req, res) => {
  const { name, email, message } = req.body;
  db.run('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)', [name, email, message], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/');
    }
  });
});

//console.log('Before database initialization');
// Existing code...
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

// Create tables if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS lineup (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS stages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT
  )
`);

// Insert sample data
db.run("INSERT INTO lineup (artist) VALUES ('Artist 1')");
db.run("INSERT INTO lineup (artist) VALUES ('Artist 2')");
db.run("INSERT INTO stages (name) VALUES ('Main Stage')");
db.run("INSERT INTO stages (name) VALUES ('Acoustic Stage')");

//console.log('After database initialization');

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
