const pool = require('./db/db');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected to Supabase! Current Time:', res.rows[0].now);
  } catch (error) {
    console.error('Database connection error:', error);
  } finally {
    pool.end();
  }
})();
