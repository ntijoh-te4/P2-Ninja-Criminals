require 'sinatra'
require 'sqlite3'

db = SQLite3::Database.open 'test.db'
db.results_as_hash = true
db.execute("CREATE TABLE IF NOT EXISTS users(name TEXT, role TEXT, password, TEXT)")
db.execute("INSERT INTO users(name, role, password) VALUES (?, ?, ?)", 'teacher', 'teacher', 'not_password')
db.execute("UPDATE users SET password=? WHERE name=?", 'password', 'teacher')

result = db.query("SELECT * FROM users")

first_result = result.next

get '/' do
    if first_result
        first_result
    else
        'something went wrong'
    end
end 