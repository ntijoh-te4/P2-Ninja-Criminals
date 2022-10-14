require 'sinatra'
require 'sqlite3'
require 'json'

enable :sessions

db = SQLite3::Database.open('./backend/users.db')
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
    db.execute('SELECT * FROM users WHERE name = ? AND password = ?', [payload['name'], payload['password']])[0].to_json
end

post '/api/users' do
    payload = JSON.parse(request.body.read)
    db.execute('INSERT INTO users(name, role, password) VALUES (?,?,?)', payload['name'],payload['role'],payload['password'])
    return {result: 'success'}.to_json
end

post '/api/comment' do
    headers( "Access-Control-Allow-Origin" => "*", 'Access-Control-Allow-Methods' => ["OPTIONS","POST","GET"])
    content_type :json
    payload = JSON.parse(request.body.read)
    p db.execute('SELECT * FROM users').to_json

    p payload['receiver_name']
    db.execute('INSERT INTO comments(comment,rating) VALUES (?,?)', payload['comment'], payload['rating'].to_i)
    comment_id = JSON.parse(db.execute('SELECT id FROM comments ORDER BY id DESC LIMIT 1').to_json)[0]['id']
    receiver_id = JSON.parse(db.execute('SELECT id FROM users WHERE name = ?', payload['receiver_name']).to_json)[0]['id']
    db.execute('INSERT INTO comment_user(receiver_id,sender_id,comment_id) VALUES (?,?,?)', receiver_id, payload['user_id'].to_i, comment_id)

    p db.execute('SELECT * FROM comment_user').to_json

    return {result: 'success'}.to_json
end



    


