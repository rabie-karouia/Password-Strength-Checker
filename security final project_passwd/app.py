from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, static_url_path='/static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///passwords.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a secure secret key
db = SQLAlchemy(app)

class Password(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(255), unique=True, nullable=False)
    strength = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return '<Password %r>' % self.password

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/message')
def message():
    return render_template('message.html')

@app.route('/password-strength-checker', methods=['POST'])
def check_password_strength():
    password = request.json.get('password')

    # You can add your password strength checking logic here
    return jsonify({'message': None})

@app.route('/add_password', methods=['POST'])
def add_password():
    data = request.get_json()
    if data:
        password = data.get('password')
        strength = data.get('strength')

        hashed_password = generate_password_hash(password)
        new_password = Password(password=hashed_password, strength=strength)
        db.session.add(new_password)
        db.session.commit()

        return 'Password added successfully'
    else:
        return 'No data received', 400

@app.route('/passwords')
def get_passwords():
    passwords = Password.query.all()
    results = [{'password': password.password, 'strength': password.strength} for password in passwords]
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
