require 'sinatra'
require 'sqlite3'
require 'json'

enable :sessions

db = SQLite3::Database.new('users.db')
db.results_as_hash = true

before do
    content_type :json
    headers( 
        "Access-Control-Allow-Origin" => "*",
        'Access-Control-Allow-Methods' => ["OPTIONS","POST","GET"]
    )
end

get '/api/users' do
    db.execute('SELECT * FROM users').to_json
end 

get '/api/users/:id' do
    db.execute('SELECT * FROM users WHERE id = ?', params['id']).to_json
end

post '/api/user' do
    payload = JSON.parse(request.body.read)
    db.execute('SELECT * FROM users WHERE name = ? AND password = ?', [payload['name'], payload['password']]).to_json
end

post '/api/users' do
    payload = JSON.parse(request.body.read)
    db.execute('INSERT INTO users(name, role, password) VALUES (?,?,?)', payload['name'],payload['role'],payload['password'])
    return {result: 'success'}.to_json
end