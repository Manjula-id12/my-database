import express from 'express';
const bodyParser = require('./body-parser');
const { Pool } =require('./pg');

const app = express();
const port = 3000;


// Database connection configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'my_database',
  password: 'Manjula',
  port: 5432,
});

app.use(bodyParser.json());

// Route to create 50 dummy records
app.post('/createDummyData', async (req, res) => {
  try {
    // Your logic to insert dummy data into the database
    await pool.query('INSERT INTO customers (name, age, phone, location, created_at) VALUES ($1, $2, $3, $4, $5)', ['John Doe', 30, '123-456-7890', 'New York', new Date()]);
    // Insert 49 more dummy records
    // ...
    res.status(200).json({ message: 'Dummy data created successfully' });
  } catch (error) {
    console.error('Error creating dummy data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to fetch data with pagination
app.get('/customers', async (req, res) => {
  try {
    const searchQuery= req.query.search || '';
    const sortBy = req.query.search ||'created_at';
    const sortOrder = req.query.sortOrder ==='desc' ?'DESC' : 'ASC';
    const queryResult = await pool.query(
        'SELECT sno, customer_name, age, phone , location, created_at FROM your _table_name  WHERE customer_name ILIKE $1 OR LOCATION ILIKE $1 ORDER BY ${SORTBy} ${sortOrder}' ['%${searchQuery}']
    
      
    
    
    );
    res.status(200).json(queryResult.rows);

  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Other routes for search and sorting can be implemented similarly

app.listen(port, () => {
  console.log('Server is running on port ${port}');
});
