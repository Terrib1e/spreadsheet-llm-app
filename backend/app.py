from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Set up OpenAI API from environment variable
# openai.api_key = os.getenv("OPENAI_API_KEY")

# For demo purposes, use a mock LLM response function
def mock_llm_response(texts, prompt):
    """
    Mock function that simulates an LLM response.
    This is used for demonstration when no actual API keys are available.
    """
    logger.info(f"Generating mock responses for prompt: {prompt}")

    # For the engineer/non-engineer classification example
    if "engineer" in prompt.lower():
        responses = []
        for text in texts:
            if any(keyword in text.lower() for keyword in ["computer science", "engineering", "software", "data science"]):
                responses.append("Engineer")
            else:
                responses.append("Non-Engineer")
        return responses

    # Generic mock responses for other prompts
    return [f"Generated content for '{text}'" for text in texts]

@app.route('/generate-column', methods=['POST'])
def generate_column():
    data = request.json

    if not data or 'columnData' not in data or 'prompt' not in data:
        return jsonify({"error": "Missing required data"}), 400

    column_data = data['columnData']
    prompt = data['prompt']

    try:
        # Use mock response for demo
        results = mock_llm_response(column_data, prompt)

        # If you want to use a real LLM API, uncomment this section and comment out the mock_llm_response
        """
        messages = []
        messages.append({"role": "system", "content": f"You will be given a list of items. For each item, {prompt}"})
        messages.append({"role": "user", "content": "Items: " + str(column_data)})

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7,
        )

        # Parse the response and convert to list
        assistant_message = response.choices[0].message.content
        # This parsing depends on how your LLM returns the data
        # For simplicity, we're assuming it returns a newline separated list
        results = [item.strip() for item in assistant_message.split('\n') if item.strip()]
        """

        return jsonify({"results": results})

    except Exception as e:
        logger.error(f"Error generating column: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    host = os.getenv("HOST", "0.0.0.0")
    debug = os.getenv("DEBUG", "True").lower() == "true"

    app.run(debug=debug, host=host, port=port)