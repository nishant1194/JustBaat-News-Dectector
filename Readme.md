# 📰 AI-Powered News Aggregator  

An intelligent web application that classifies news headlines, assigns a **Conspiracy Score (0-100%)**, and allows users to manage news articles dynamically.  

**Demo Video link:-** https://drive.google.com/file/d/1OQ5aJDoktamlFSo6ZWpkA8IXw6DPyx4j/view?usp=sharing

## Approach
- **Preprocessing**- Stopword removal, lemmatization, punctuation & number cleaning using NLTK. Text converted to TF-IDF vectors.
- **Fake News Detection**- Logistic Regression classifies news. Model saved as news_classifier.pkl.
- **Conspiracy Score**- Logistic Regression assigns a 0-100% conspiracy score. Model saved as conspiracy_score_fake_news_model.pkl.
- **Backend**- Node.js + Express.js handles API requests, loads models using Joblib, and stores data in MongoDB.
- **Frontend**- React.js sends news for analysis, displays results with modern UI

## Installation steps
- Clone this git repo.
- Go to client directory and write following commands
- npm install
- npm run dev
- Now go to server directory and write following commands
- npm install
- npm run nodemon
- Now run mlsever is a python flask server which fetches the predictions from model. Write following commands to run this server
- python mlsever.py

- The client will running on **http://localhost:5173/**
- The server will running on **http://localhost:6005/**
- The ml server will running on **http://localhost:5001/**
  
---

## 📌 Features  

### 🔹 Interactive Headline Classification  
- Users can enter a **news headline** into a text box.  
- The **NLP model** processes the headline and assigns a **Conspiracy Score (0-100%)** in real time.  
- Categorizes headlines into **Real or Fake News**.  

### 🔹 Custom NLP Model  
- Uses **TF-IDF + Logistic Regression** for classification.  
- Detects **Real or Fake News and gives Conspiracy Score to** news dynamically.  

### 🔹 CRUD Operations  
✅ **Create** – User can test headline that will be stored in dataset.  
📖 **Read** – Fetch headline searched in history.  
✏️ **Update** – Adjust the **Conspiracy Score** if incorrectly classified.  
🗑 **Delete** – Remove flagged news items.  

### 🔹 Optional Enhancements  
- Highlights **frequently used suspicious words** in a headline.  
- Performs **sentiment analysis** for additional insights.  

---



## 🛠️ Tech Stack  

### 🔹 Frontend  
- **React.js** (UI framework)  
- **Axios** (API requests)  
- **Tailwind CSS / CSS** (Styling)  

### 🔹 Backend  
- **Node.js + Express.js** (API development)  
- **MongoDB** (Database)  

### 🔹 Machine Learning Model  
- **Scikit-learn** (TF-IDF + Logistic Regression)  
- **NLTK** (Stopwords removal & Lemmatization)  
- **Joblib** (Model serialization)  

---

## 📊 Machine Learning Model Details  

### **🔹 Fake News Detection Model**  
- **Algorithm:** TF-IDF + Logistic Regression  
- **Dataset:** `train.csv` (Fake News dataset)  
- **Preprocessing:**  
  - **Stemming & Lemmatization** (using `PorterStemmer` and `WordNetLemmatizer`)  
  - **Stopword Removal** (`nltk.corpus.stopwords`)  
  - **Punctuation & Number Removal**  

- **Output:**  
  - `0 → Real News`  
  - `1 → Fake News`  
- **Model Saved As:** `news_classifier.pkl`  
- **TF-IDF Vectorizer Saved As:** `tfidf_vectorizer.pkl`  

---

### **🔹 Conspiracy Score Model**  
- **Algorithm:** Logistic Regression + TF-IDF  
- **Preprocessing:**  
  - **Stopword Removal, Lemmatization, Number & Punctuation Cleaning**  
- **Conspiracy Score Calculation:**  
  - Uses a **dot product of probability scores with a linear scaling (0-100%)**  
- **Model Saved As:** `conspiracy_score_fake_news_model.pkl`  
- **TF-IDF Vectorizer Saved As:** `conspiracy_score_vectorizer.pkl`  

