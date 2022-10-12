require 'sinatra'
require 'sqlite3'
require 'json'

# db = SQLite3::Database.open 'test.db'
# db.results_as_hash = true
# db.execute("CREATE TABLE IF NOT EXISTS users(name TEXT, role TEXT, password TEXT)")
# db.execute("INSERT INTO users(name, role, password) VALUES (?, ?, ?)", 'teacher', 'teacher', 'not_password')
# db.execute("UPDATE users SET password=? WHERE name=?", 'password', 'teacher')
# #to dropp tables = DROP TABLE users

#result = db.query("SELECT * FROM users")

#first_result = result.next


db = SQLite3::Database.new('users.db')
db.results_as_hash = true

get '/api/users' do
    content_type :json
    db.execute('SELECT * FROM users').to_json
end 

get '/api/users/:id' do
    content_type :json
    db.execute('SELECT * FROM users WHERE id = ?', params['id']).to_json
end
    

