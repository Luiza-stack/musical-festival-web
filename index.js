const express = require('express');
const app = express();
const port = 5000;

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  // Assuming you have some dynamic content for the home page
  const dynamicContent = "Welcome to the Music Festival!";
  res.render('index', { content: dynamicContent });
});

// Route for Lineup page
app.get('/lineup', (req, res) => {
  // Assuming you have some dynamic content for the Lineup page
  const lineupContent = "Check out our amazing lineup!";
  res.render('index', { content: lineupContent });
});

// Route for Stages page
app.get('/stages', (req, res) => {
  // Assuming you have some dynamic content for the Stages page
  const stagesContent = "Explore our festival stages!";
  res.render('index', { content: stagesContent });
});

// Route for FAQ page
app.get('/faq', (req, res) => {
  // Assuming you have some dynamic content for the FAQ page
  const faqContent = "Frequently Asked Questions";
  res.render('index', { content: faqContent });
});

// Route for Contact page
app.get('/contact', (req, res) => {
  // Assuming you have some dynamic content for the Contact page
  const contactContent = "Get in touch with us!";
  res.render('index', { content: contactContent });
});

// Route for Activity page
app.get('/activity', (req, res) => {
  // Assuming you have some dynamic content for the Activity page
  const activityContent = "Engage in festival activities!";
  res.render('index', { content: activityContent });
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

console.log('Before database initialization');
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

console.log('After database initialization');

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
