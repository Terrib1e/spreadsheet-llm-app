# CharacterQuilt Smart Spreadsheet

A React-based spreadsheet application with LLM-powered column generation, built for the CharacterQuilt interview task.

## Features

- Interactive spreadsheet UI with editable cells
- Add/update rows & columns functionality
- LLM integration to generate new columns based on existing data
- Backend API for LLM completions

## Setup Instructions

### Frontend

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start the Flask server:
```bash
python app.py
```

## Usage

1. The frontend will be available at http://localhost:5173
2. The backend API will be available at http://localhost:5000
3. To generate a new column based on existing data:
   - Select a source column
   - Enter a prompt describing what to generate
   - Click "Generate New Column"

## LLM Integration

The application uses mock LLM responses by default. To use a real OpenAI API:

1. Uncomment the relevant code in `backend/app.py`
2. Set your OpenAI API key as an environment variable:
```bash
export OPENAI_API_KEY=your_api_key  # On Windows: set OPENAI_API_KEY=your_api_key
```

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Flask
- **LLM Integration**: OpenAI (optional)
