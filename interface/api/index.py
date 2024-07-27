from flask import Flask, request, jsonify
from flask_cors import CORS
from core_llm_communication import initial_user_input, chat_user_input

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # This will enable CORS for all routes

current_data = {"name": None, "chapter": None, "topic": None, "theme": None}
initial_response = {"response": None}

@app.route("/api/python")
def hello_world():
    return "<p>Hello, Wordld!</p>"

@app.route("/api/chatbot", methods=["POST"])
def chatbot():
    global initial_response  
    data = request.json
    if not data or "story_model_parameters" not in data:
        return jsonify({"error": "Invalid input"}), 400

    params = data["story_model_parameters"]
    current_data["name"] = params.get("name")
    current_data["chapter"] = params.get("chapter")
    current_data["topic"] = params.get("topic")
    current_data["theme"] = params.get("theme")

    response_content = initial_user_input(
        current_data["name"],
        current_data["topic"],
        current_data["chapter"],
        current_data["theme"]
    )
    initial_response["response"] = response_content
    
    return jsonify({"response": response_content})

@app.route("/api/chat_user_input", methods=["POST"])
def handle_chat_user_input():
    data = request.json
    if not data or "user_query" not in data:
        return jsonify({"error": "Invalid input"}), 400

    user_query = data["user_query"]
    response_content = chat_user_input(user_query)
    
    return jsonify({"response": response_content})

@app.route("/api/get_response", methods=["GET"])
def get_response():
    return jsonify({"response": initial_response["response"]})

@app.route("/api/current-data", methods=["GET"])
def get_current_data():
    return jsonify(current_data)

if __name__ == "__main__":
    app.run(debug=True)
