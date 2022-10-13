require 'sqlite3'
require 'pp'

db = SQLite3::Database.new 'users.db'

db.execute('DROP TABLE IF EXISTS users')
db.execute('CREATE TABLE users(

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(40),
    password VARCHAR(100),
    role VARCHAR(40)
)')
db.execute('INSERT INTO users(name, password, role) VALUES(?,?,?)', ['teacher','teacher','teacher'])
db.execute('INSERT INTO users(name, password, role) VALUES(?,?,?)', ['student','student','student'])
db.results_as_hash = true
pp result = db.execute('SELECT * FROM users')