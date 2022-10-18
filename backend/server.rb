require 'sinatra'
require 'sqlite3'
require 'json'

db = SQLite3::Database.open('users.db')
db.results_as_hash = true

before do
    content_type :json
    headers( 
        "Access-Control-Allow-Origin" => "*",
        "Access-Control-Allow-Methods" => ["OPTIONS","POST","GET"],
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

post '/api/comment/new' do
    payload = JSON.parse(request.body.read)

    p payload

    db.execute('INSERT INTO comments(comment,rating) VALUES (?,?)', payload['comment'], payload['rating'].to_i)
    comment_id = JSON.parse(db.execute('SELECT id FROM comments ORDER BY id DESC LIMIT 1').to_json)[0]['id']
    receiver_id = JSON.parse(db.execute('SELECT id FROM users WHERE name = ?', payload['receiver_name']).to_json)[0]['id']
    db.execute('INSERT INTO comment_user(receiver_id,assignment_name,comment_id) VALUES (?,?,?)', receiver_id, payload['assignment'], comment_id)
end

post '/api/comments' do
    payload = JSON.parse(request.body.read)
    return_data = db.execute('SELECT comments.comment,comments.rating,comment_user.assignment_name FROM comments INNER JOIN comment_user ON comments.id = comment_user.comment_id WHERE comment_user.receiver_id = ?', payload['id'].to_i)
    p return_data.to_json
    return return_data.to_json
end