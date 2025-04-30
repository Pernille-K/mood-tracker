const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
// Express er et rammeverk for Node.js som gjør det enklere å lage servere og ruter raskt og webapplikasjoner
const port = 3000;

app.use(bodyParser.json());
// body-parser er et middleware som hjelper oss å parse (lese, oversette) innkommende forespørsel-bodyer i JSON-format

app.get("/", (req, res) => {
	res.send("Hello, world! Server is running.");
});

// POST-route to save mood
app.post("/api/moods", (req, res) => {
	const { mood } = req.body;

	if (!mood) {
		return res.status(400).json({ error: "Mood is required" });
	}

	db.all("SELECT * FROM moods where mood = ?", [mood], (err, rows) => {
		if (err) {
			return res.status(500).json({ error: "Failed to check existing mood" });
		}

		if (rows.length > 0) {
			return res.status(200).json({ message: "Mood already exists", id: rows[0].id });
		}

		db.run("INSERT INTO moods (mood) VALUES (?)", [mood], function (err) {
			if (err) {
				console.error(err.message);
				return res.status(500).json({ error: "Failed to save mood" });
			}

			res.status(201).json({ message: "Mood saved!", id: this.lastID });
		});
	});
});

// GET-route to retrieve all moods
app.get("/api/moods", (req, res) => {
	db.all("SELECT * FROM moods", [], (err, rows) => {
		if (err) {
			return res.status(500).json({ error: "Failed to retrieve moods" });
		}
		res.status(200).json(rows); // Send all moods back as a JSON-response
	});
});

// GET-route to retrieve last 6 moods
app.get("/api/last-moods", (req, res) => {
	db.all("SELECT * FROM moods LIMIT 6", [], (err, rows) => {
		if (err) {
			return res.status(500).json({ error: "Failed to retrieve last moods" });
		}
		res.status(200).json(rows); // Send all moods back as a JSON-response
	});
});

// POST-route to save tag
app.post("/api/tags", (req, res) => {
	const { tag } = req.body;

	console.log("Received tag:", tag);

	if (!tag) {
		return res.status(400).json({ error: "Tag is required" });
	}

	db.all("SELECT * FROM tags where tag = ?", [tag], (err, rows) => {
		if (err) {
			console.error("Error checking existing tag:", err.message);
			return res.status(500).json({ error: "Failed to check existing tag" });
		}

		if (rows.length > 0) {
			return res.status(200).json({ message: "Tag already exists", id: rows[0].id });
		}

		db.run("INSERT INTO tags (tag) VALUES (?)", [tag], function (err) {
			if (err) {
				console.error("Error saving tag:", err.message);
				return res.status(500).json({ error: "Failed to save tag" });
			}

			res.status(201).json({ message: "Tag saved!", id: this.lastID });
		});
	});
});

// GET-route to retrieve all tags
app.get("/api/tags", (req, res) => {
	db.all("SELECT * FROM tags", [], (err, rows) => {
		if (err) {
			return res.status(500).json({ error: "Failed to retrieve tags" });
		}
		res.status(200).json(rows); // Send all moods back as a JSON-response
	});
});

// GET-route to retrieve last 6 tags
app.get("/api/last-tags", (req, res) => {
	db.all("SELECT * FROM tags LIMIT 6", [], (err, rows) => {
		if (err) {
			return res.status(500).json({ error: "Failed to retrieve last tags" });
		}
		res.status(200).json(rows); // Send all moods back as a JSON-response
	});
});

// POST-route to save mood and tag together
app.post("/api/mood_tags", (req, res) => {
	const { mood, tag } = req.body;

	if (!mood || !tag) {
		return res.status(400).json({ error: "Mood and tag are required" });
	}

	db.serialize(() => {
		db.get("SELECT id FROM moods WHERE mood = ?", [mood], function (err, moodRow) {
			if (err) {
				console.error(err.message);
				return res.status(500).json({ error: "Failed to get mood" });
			}

			const insertMood = (moodId) => {
				db.get("SELECT id FROM tags WHERE tag = ?", [tag], function (err, tagRow) {
					if (err) {
						console.error(err.message);
						return res.status(500).json({ error: "Failed to get tag" });
					}

					const insertTag = (tagId) => {
						db.run(
							"INSERT OR IGNORE INTO mood_tags (mood_id, tag_id) VALUES (?, ?)",
							[moodId, tagId],
							function (err) {
								if (err) {
									console.error(err.message);
									return res.status(500).json({ error: "Failed to link mood and tag" });
								}

								res.status(201).json({ message: "Mood and tag saved & linked!", moodId, tagId });
							}
						);
					};

					if (tagRow) {
						insertTag(tagRow.id);
					} else {
						db.run("INSERT INTO tags (tag) VALUES (?)", [tag], function (err) {
							if (err) {
								console.error(err.message);
								return res.status(500).json({ error: "Failed to insert tag" });
							}
							insertTag(this.lastID);
						});
					}
				});
			};

			if (moodRow) {
				insertMood(moodRow.id);
			} else {
				db.run("INSERT INTO moods (mood) VALUES (?)", [mood], function (err) {
					if (err) {
						console.error(err.message);
						return res.status(500).json({ error: "Failed to insert mood" });
					}
					insertMood(this.lastID);
				});
			}
		});
	});
});

// GET-route to retrieve all moods and tags that are connected
app.get("/api/mood_tags", (req, res) => {
	const sql = `
		SELECT moods.mood, tags.tag, mood_tags.created_at
		FROM mood_tags
		JOIN moods ON mood_tags.mood_id = moods.id
		JOIN tags ON mood_tags.tag_id = tags.id
		ORDER BY mood_tags.created_at DESC
	`;

	db.all(sql, [], (err, rows) => {
		if (err) {
			console.error("Error: ", err);
			return res.status(500).json({ error: "Failed to get mood_tags" });
		}

		res.status(200).json(rows); // Send all mood_tags back as a JSON-response
	});
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
