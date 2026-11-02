import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';

const app = express();
const PORT = 5000;

// ==========================================
// 1. MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());


// ==========================================
// 2. DATABASE SETUP
// ==========================================

const db = new Database('database.db', {
  verbose: console.log
});

// Enable foreign key enforcement
db.pragma('foreign_keys = ON');


// TABLE 1: USERS
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE
  )
`).run();


// TABLE 2: MEDIA
db.prepare(`
  CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL
  )
`).run();


// TABLE 3: USER_MEDIA
db.prepare(`
  CREATE TABLE IF NOT EXISTS user_media (
    user_id INTEGER NOT NULL,
    media_id INTEGER NOT NULL,

    PRIMARY KEY (user_id, media_id),

    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE,

    FOREIGN KEY (media_id)
      REFERENCES media(id)
      ON DELETE CASCADE
  )
`).run();


// ==========================================
// 3. SEED USERS
// ==========================================

// Create sample users if they don't already exist

db.prepare(`
  INSERT OR IGNORE INTO users (username)
  VALUES ('jasper'), ('alex')
`).run();


// ==========================================
// 4. PREPARED SQL STATEMENTS
// ==========================================

// Insert a new user
const insertUser = db.prepare(`
  INSERT INTO users (username)
  VALUES (?)
`);


// Insert new media into global catalog
const insertMedia = db.prepare(`
  INSERT INTO media (name, image, description)
  VALUES (?, ?, ?)
`);


// Connect a user to existing media
const addUserMedia = db.prepare(`
  INSERT INTO user_media (user_id, media_id)
  VALUES (?, ?)
`);


// Get all users
const getAllUsers = db.prepare(`
  SELECT * FROM users
`);


// Get all media
const getAllMedia = db.prepare(`
  SELECT * FROM media
`);


// Get one user's media collection
const getUserMedia = db.prepare(`
  SELECT media.*
  FROM media
  JOIN user_media
    ON media.id = user_media.media_id
  JOIN users
    ON users.id = user_media.user_id
  WHERE users.username = ?
`);


// Find a user by username
const getUser = db.prepare(`
  SELECT * FROM users
  WHERE username = ?
`);


// Find media by ID
const getMedia = db.prepare(`
  SELECT * FROM media
  WHERE id = ?
`);


// Remove a media association
const removeUserMedia = db.prepare(`
  DELETE FROM user_media
  WHERE user_id = ? AND media_id = ?
`);


// ==========================================
// 5. USER API ENDPOINTS
// ==========================================


// GET ALL USERS
// URL: GET /api/users

app.get('/api/users', (req, res) => {
  try {
    const users = getAllUsers.all();

    res.json(users);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// CREATE A USER
// URL: POST /api/users
// Body: { "username": "jasper2" }

app.post('/api/users', (req, res) => {
  try {
    const { username } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({
        error: 'Username is required'
      });
    }

    const cleanUsername = username.trim();

    const result = insertUser.run(cleanUsername);

    res.status(201).json({
      id: result.lastInsertRowid,
      username: cleanUsername
    });

  } catch (error) {
    res.status(400).json({
      error: 'Username might already exist or data is invalid'
    });
  }
});


// ==========================================
// 6. GLOBAL MEDIA API ENDPOINTS
// ==========================================


// GET ALL MEDIA IN DATABASE
// URL: GET /api/media

app.get('/api/media', (req, res) => {
  try {
    const media = getAllMedia.all();

    res.json(media);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// CREATE NEW MEDIA IN GLOBAL DATABASE
// URL: POST /api/media
// Body:
// {
//   "name": "Parks and Rec",
//   "image": "parks.jpg",
//   "description": "A city government comedy"
// }

app.post('/api/media', (req, res) => {
  try {
    const { name, image, description } = req.body;

    if (
      typeof name !== 'string' || !name.trim() ||
      typeof image !== 'string' || !image.trim() ||
      typeof description !== 'string' || !description.trim()
    ) {
      return res.status(400).json({
        error: 'Name, image, and description are required'
      });
    }

    const cleanName = name.trim();
    const cleanImage = image.trim();
    const cleanDescription = description.trim();

    const result = insertMedia.run(
      cleanName,
      cleanImage,
      cleanDescription
    );

    res.status(201).json({
      id: result.lastInsertRowid,
      name: cleanName,
      image: cleanImage,
      description: cleanDescription
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// ==========================================
// 7. USER MEDIA COLLECTION ENDPOINTS
// ==========================================


// GET ALL MEDIA BELONGING TO A USER
// URL: GET /api/media/jasper

app.get('/api/media/:username', (req, res) => {
  try {
    const { username } = req.params;

    const user = getUser.get(username);

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const media = getUserMedia.all(username);

    res.json(media);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// ADD EXISTING MEDIA TO A USER'S COLLECTION
// URL: POST /api/users/jasper/media
// Body: { "mediaId": 1 }

app.post('/api/users/:username/media', (req, res) => {
  try {
    const { username } = req.params;
    const { mediaId } = req.body;

    if (
      !Number.isSafeInteger(mediaId) ||
      mediaId <= 0
    ) {
      return res.status(400).json({
        error: 'A valid mediaId is required'
      });
    }

    // Find user
    const user = getUser.get(username);

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    // Find existing media
    const media = getMedia.get(mediaId);

    if (!media) {
      return res.status(404).json({
        error: 'Media not found'
      });
    }

    // Create relationship
    addUserMedia.run(user.id, mediaId);

    res.status(201).json({
      message: 'Media successfully added to collection',
      media
    });

  } catch (error) {

    // Prevent duplicate media associations
    if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
      return res.status(409).json({
        error: 'User already has this media'
      });
    }

    res.status(500).json({
      error: error.message
    });
  }
});


// REMOVE MEDIA FROM A USER'S COLLECTION
// URL: DELETE /api/users/jasper/media/1

app.delete('/api/users/:username/media/:mediaId', (req, res) => {
  try {
    const { username, mediaId } = req.params;

    const user = getUser.get(username);

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const media = getMedia.get(Number(mediaId));

    if (!media) {
      return res.status(404).json({
        error: 'Media not found'
      });
    }

    const result = removeUserMedia.run(
      user.id,
      Number(mediaId)
    );

    if (result.changes === 0) {
      return res.status(404).json({
        error: 'Media was not in this user collection'
      });
    }

    res.json({
      message: 'Media removed from user collection'
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// ==========================================
// 8. START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(
    `🚀 Backend server running on http://localhost:${PORT}`
  );
});