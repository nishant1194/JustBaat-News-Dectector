import numpy as np
import pandas as pd
import re
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score


import nltk
nltk.download('stopwords')

print(stopwords.words('english'))

news_dataset = pd.read_csv('train.csv')


news_dataset.head()


news_dataset.shape

news_dataset.isnull().sum()

news_dataset = news_dataset.fillna('')

X = news_dataset.drop(columns='label', axis=1)
Y = news_dataset['label']


print(X)
print(Y)

port_stem = PorterStemmer()

def stemming(content):
    stemmed_content = re.sub('[^a-zA-Z]',' ',content)
    stemmed_content = stemmed_content.lower()
    stemmed_content = stemmed_content.split()
    stemmed_content = [port_stem.stem(word) for word in stemmed_content if not word in stopwords.words('english')]
    stemmed_content = ' '.join(stemmed_content)
    return stemmed_content


news_dataset['content'] = news_dataset['content'].apply(stemming)

news_dataset['content'] = news_dataset['author']+' '+news_dataset['title']

X = news_dataset['content'].values
Y = news_dataset['label'].values


vectorizer = TfidfVectorizer()
vectorizer.fit(X)
X = vectorizer.transform(X)

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size = 0.2, stratify=Y, random_state=2)


model = LogisticRegression()

model.fit(X_train, Y_train)


X_train_prediction = model.predict(X_train)
training_data_accuracy = accuracy_score(X_train_prediction, Y_train)

print('Accuracy score of the training data : ', training_data_accuracy)


X_test_prediction = model.predict(X_test)
test_data_accuracy = accuracy_score(X_test_prediction, Y_test)

X_new = X_test[3]

prediction = model.predict(X_new)
print(prediction)

if (prediction[0]==0):
  print('The news is Real')
else:
  print('The news is Fake')

  print(Y_test[3])


  import joblib


joblib.dump(model, "news_classifier.pkl")
joblib.dump(vectorizer, "tfidf_vectorizer.pkl")


import string
from sklearn.preprocessing import MinMaxScaler

nltk.download('wordnet')
nltk.download('stopwords')
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()
scaler = MinMaxScaler(feature_range=(0, 100))  

def preprocess_text(text):
    text = text.lower()  # Convert to lowercase
    text = re.sub(r'\d+', '', text)  # Remove numbers
    text = text.translate(str.maketrans("", "", string.punctuation))  # Remove punctuation
    text = re.sub(r'\s+', ' ', text).strip()  # Remove extra spaces
    text = " ".join([lemmatizer.lemmatize(word) for word in text.split() if word not in stop_words])  # Lemmatization
    return text



def predict_headline(headline):
    cleaned_headline = preprocess_text(headline)
    transformed_headline = vectorizer.transform([cleaned_headline])
    prediction = model.predict_proba(transformed_headline)[0]  # Get probability scores

    # Compute conspiracy score using dot product with a smoother scale
    score = np.dot(prediction, np.linspace(0, 1, len(prediction))) * 100  

    return int(score)


headline = "Breaking: You Won't Believe What This Celebrity Did!"
score = predict_headline(headline)
print(f"Conspiracy Score: {score}%")


headline = "Iranian woman jailed for fictional unpublished story about woman stoned to death for adultery!"
score = predict_headline(headline)
print(f"Conspiracy Score: {score}%")
                                            
headline = "Jackie Mason: Hollywood Would Love Trump if He Bombed North Korea over Lack of Trans Bathrooms (Exclusive Video) - Breitbart"
score = predict_headline(headline)
print(f"Conspiracy Score: {score}%")
                                            

joblib.dump(model, "conspiracy_score_fake_news_model.pkl")
joblib.dump(vectorizer, "conspiracy_score_vectorizer.pkl")






#to start with conspiracy score 
import joblib

# Load the trained model
model = joblib.load("conspiracy_score_fake_news_model.pkl")

# Load the saved TF-IDF vectorizer
vectorizer = joblib.load("conspiracy_score_vectorizer.pkl")

import string
import re
import numpy as np
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Download necessary NLTK data
nltk.download('stopwords')
nltk.download('wordnet')

# Initialize stop words and lemmatizer

stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

def preprocess_text(text):
    text = text.lower()  # Convert to lowercase
    text = re.sub(r'\d+', '', text)  # Remove numbers
    text = text.translate(str.maketrans("", "", string.punctuation))  # Remove punctuation
    text = re.sub(r'\s+', ' ', text).strip()  # Remove extra spaces
    text = " ".join([lemmatizer.lemmatize(word) for word in text.split() if word not in stop_words])  # Lemmatization
    return text


def predict_headline(headline):
    cleaned_headline = preprocess_text(headline)  # Make sure to define preprocess_text function
    transformed_headline = vectorizer.transform([cleaned_headline])
    prediction = model.predict_proba(transformed_headline)[0]  # Get probability scores

    # Compute conspiracy score using dot product with a smoother scale
    score = np.dot(prediction, np.linspace(0, 1, len(prediction))) * 100  

    return int(score)

headline = "Breaking: You Won't Believe What This Celebrity Did!"
score = predict_headline(headline)
print(f"Conspiracy Score: {score}%")




## to get ready with main model news real or fake

import re   
import joblib
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# Load the trained model and vectorizer
model = joblib.load("news_classifier.pkl")  
vectorizer = joblib.load("tfidf_vectorizer.pkl")  

# Initialize necessary components
port_stem = PorterStemmer()
stop_words = set(stopwords.words('english'))  # Ensure stop words are loaded


def stemming(content):
    stemmed_content = re.sub('[^a-zA-Z]', ' ', content)  # Remove non-alphabet characters
    stemmed_content = stemmed_content.lower()  # Convert to lowercase
    stemmed_content = stemmed_content.split()  # Tokenize words
    stemmed_content = [port_stem.stem(word) for word in stemmed_content if word not in stop_words]  
    stemmed_content = ' '.join(stemmed_content)  # Join words back into a string
    return stemmed_content

headline = "Jackie Mason: Hollywood Would Love Trump if He Bombed North Korea over Lack of Trans Bathrooms (Exclusive Video) - Breitbart"

cleaned_headline = stemming(headline)

transformed_headline = vectorizer.transform([cleaned_headline]) 

prediction = model.predict(transformed_headline)
print("Prediction:", "Fake News" if prediction[0] == 1 else "Real News")




#FakeNewsJustBaat
#justBaatAi