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
    headers( 
        "Access-Control-Allow-Origin" => "*",
        'Access-Control-Allow-Methods' => ["OPTIONS","POST","GET"]
    )

    content_type :json
    db.execute('SELECT * FROM users').to_json
end 

get '/api/users/:id' do
    headers( 
        "Access-Control-Allow-Origin" => "*", 
        'Access-Control-Allow-Methods' => ["OPTIONS","POST","GET"]
    )

    content_type :json
    db.execute('SELECT * FROM users WHERE id = ?', params['id']).to_json
end

get '/api/users/:name/:password' do
    headers( 
        "Access-Control-Allow-Origin" => "*",
        'Access-Control-Allow-Methods' => ["OPTIONS","POST","GET"] 
    )

    content_type :json
    db.execute('SELECT * FROM users WHERE name = ? AND password = ?', [params['name'], params['password']]).to_json
end

post '/api/users' do
    headers( "Access-Control-Allow-Origin" => "*", 'Access-Control-Allow-Methods' => ["OPTIONS","POST","GET"])
    content_type :json
    payload = JSON.parse(request.body.read)
    db.execute('INSERT INTO users(name, role, password) VALUES (?,?,?)', payload['name'],payload['role'],payload['password'])
    return {result: 'success'}.to_json
end

post '/api/comment' do
    headers( "Access-Control-Allow-Origin" => "*", 'Access-Control-Allow-Methods' => ["OPTIONS","POST","GET"])
    content_type :json
    payload = JSON.parse(request.body.read)
    p payload
    return payload
end



    


