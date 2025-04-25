const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("mood.db");

db.serialize(() => {
	// Create moods-table
	db.run(`
    CREATE TABLE IF NOT EXISTS moods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mood TEXT NOT NULL UNIQUE
    );
  `);

	// Create tags-table
	db.run(`
    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tag TEXT NOT NULL UNIQUE
    );
  `);

	// Create mood_tags-table
	db.run(`
    CREATE TABLE IF NOT EXISTS mood_tags (
      mood_id INTEGER,
      tag_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (mood_id) REFERENCES moods(id),
      FOREIGN KEY (tag_id) REFERENCES tags(id),
      UNIQUE(mood_id, tag_id)
    );
  `);
});

module.exports = db;
