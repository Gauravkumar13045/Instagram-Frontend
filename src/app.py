from flask import Flask, render_template, request, jsonify


app = Flask(__name__)

@app.route("/")
def login():
    return render_template("login.jsx")

@app.route("/submit", methods=["POST"])
def submit():
    username = request.form.get("loginId")
    password = request.form.get("password")

    if username == "Admin123" and password == "qwerty123":
        return render_template("dashboard", name = username)
    else:
        return "Invalid credentials, try again!"

if __name__ == "__main__":
    app.run(debug=True)