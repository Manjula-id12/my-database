const {pool} = require('pg');

const pool = new Pool({
  user: 'your_db_user',
  host: 'your_db_host',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

const insertDummyData = async () => {
  try {
    // Implement logic to insert 50 dummy records into your_table_name
    // Use pool.query() to execute SQL INSERT statements
  } catch (error) {
    console.error(error);
  } finally {
    pool.end();
  }
};

insertDummyData();