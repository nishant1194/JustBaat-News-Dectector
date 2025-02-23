from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import string
import numpy as np
import nltk

from nltk.stem import WordNetLemmatizer

app = Flask(__name__)
CORS(app)  # Allow frontend requests


# Load the trained model
model2 = joblib.load("conspiracy_score_fake_news_model.pkl")

# Load the saved TF-IDF vectorizer
vectorizer2 = joblib.load("conspiracy_score_vectorizer.pkl")

# Load model and vectorizer only once
model = joblib.load("news_classifier.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")

nltk.download('stopwords')
nltk.download('wordnet')

lemmatizer = WordNetLemmatizer()
# Define stemmer and stop words
port_stem = PorterStemmer()
stop_words = set(stopwords.words('english'))  

def stemming(content):
    stemmed_content = re.sub('[^a-zA-Z]', ' ', content)   
    stemmed_content = stemmed_content.lower()   
    stemmed_content = stemmed_content.split()  
    stemmed_content = [port_stem.stem(word) for word in stemmed_content if word not in stop_words]  
    stemmed_content = ' '.join(stemmed_content)   
    return stemmed_content

def preprocess_text(text):
    text = text.lower()  # Convert to lowercase
    text = re.sub(r'\d+', '', text)  # Remove numbers
    text = text.translate(str.maketrans("", "", string.punctuation))  # Remove punctuation
    text = re.sub(r'\s+', ' ', text).strip()  # Remove extra spaces
    text = " ".join([lemmatizer.lemmatize(word) for word in text.split() if word not in stop_words])  # Lemmatization
    return text


def predict_headline(headline):
    cleaned_headline = preprocess_text(headline)  # Make sure to define preprocess_text function
    transformed_headline = vectorizer2.transform([cleaned_headline])
    prediction = model2.predict_proba(transformed_headline)[0]  # Get probability scores

    # Compute conspiracy score using dot product with a smoother scale
    score = np.dot(prediction, np.linspace(0, 1, len(prediction))) * 100  

    return int(score)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    if "headline" not in data:
        return jsonify({"error": "Missing 'headline' field"}), 400

    score = predict_headline(data["headline"]);
    cleaned_headline = stemming(data["headline"])
    transformed_headline = vectorizer.transform([cleaned_headline]) 
    prediction = model.predict(transformed_headline)
    status = "Real";
    if(bool(prediction[0])):
        status = "Fake"
    return jsonify({ "status": status,"score":score})  # Return True/False

if __name__ == "__main__":
    print("Server running on port 5001...")
    app.run(port=5001, debug=True)




#source myenv/bin/activate 
#python mlsever.py                                       