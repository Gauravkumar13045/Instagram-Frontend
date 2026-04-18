from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*")   

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        if username == "Admin123" and password == "qwerty123":
            return jsonify({"status": "success"}), 200
        else:
            return jsonify({"status": "fail", "message": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/")
def home():
    return "Flask Backend is Running Successfully!"

if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0", port=5000)