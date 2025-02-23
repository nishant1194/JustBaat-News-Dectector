import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Linkk from "../../assets/Linkk";

const App = () => {
  const [headline, setHeadline] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    const storedUser = localStorage.getItem("UserIdId");
    if (storedUser) {
      const user = JSON.parse(storedUser); // Convert back to object
      getpastResponses();
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const getpastResponses = async () => {
    try {
      const storedUser = await localStorage.getItem("UserIdId");
      if (storedUser) {
        const user = JSON.parse(storedUser); // Convert back to object
        const resp = await axios.get(Linkk + `/api/search/${user._id}`);
        if (resp.data.success) {
          setHistory(resp.data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    if (!headline.trim()) return;
    const storedUser = await localStorage.getItem("UserIdId");
    if (storedUser) {
      const user = JSON.parse(storedUser); // Convert back to object
      try {
        const resp = await axios.post(Linkk + "/api/search", {
          headline,
          admin: user._id,
         });
        console.log(resp);
        setResult(resp?.data.data);
        setHistory((prev) => [...prev, resp?.data.data]);
        setHeadline("");
      } catch (error) {
        console.log(error);
      }
    } else {
      const resp = await axios.post(Linkk + "/api/search", {
        headline,
       })
        const newEntry = {
        _id: Date.now(),
        text: headline,
        status: resp.data.data.status,
        score: resp.data.data.score,
      };
      setResult(newEntry);
      setHistory([newEntry, ...history]);
      setHeadline("");
    }
  };

  const handleDelete = async (id) => {
    const storedUser = await localStorage.getItem("UserIdId");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const resp = await axios.delete(Linkk + `/api/search/${id}`);
      window.location.reload();
      console.log(resp);
    } else {
      setHistory(history.filter((item) => item._id !== id));
    }
  };
  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = async (id, updatedText, updatedStatus, updatedScore) => {
    const storedUser = await localStorage.getItem("UserIdId");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      try {
        const resp = await axios.put(Linkk+`/api/${id}` ,{
          headline:updatedText, status:updatedStatus,score:updatedScore, admin:user._id
        })
        console.log(resp)
      } catch (error) {
        console.log(error)
      }
    }
    setHistory(
      history.map((item) =>
        item._id === id
          ? {
              ...item,
              text: updatedText,
              status: updatedStatus,
              score: updatedScore,
            }
          : item
      )
    );
    setEditingId(null);
  };

  return (
    <>
      <Navbar />
      <div className={`container ${darkMode ? "dark" : "light"}`}>
        {/* Theme Toggle Button */}

        <h1>Fake News Detector</h1>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter news headline..."
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
          <button onClick={handleSearch}>Check</button>
        </div>

        {/* Result Section */}
        {result && (
          <div
            className={`result ${result.status === "Fake" ? "fake" : "real"}`}
          >
            <h2>Result: {result.status }</h2>
            <p>Conspiracy Score: {result.score}%</p>
          </div>
        )}

        {/* Search History */}
        <div className="history">
          <h2>Search History</h2>
          {history.length === 0 ? (
            <p>No recent searches.</p>
          ) : (
            history.map((item) => (
              <div key={item._id} className="history-item">
                {editingId === item._id ? (
                  <>
                    {/* Editable Input */}
                    <input
                      type="text"
                      value={item.headline || item.text}
                      onChange={(e) =>
                        setHistory(
                          history.map((h) =>
                            h._id === item._id
                              ? { ...h, headline: e.target.value }
                              : h
                          )
                        )
                      }
                    />
                    {/* Dropdown for Status */}
                    <select
                      value={item.status}
                      onChange={(e) =>
                        setHistory(
                          history.map((h) =>
                            h._id === item._id
                              ? { ...h, status: e.target.value }
                              : h
                          )
                        )
                      }
                    >
                      <option value="Real">Real</option>
                      <option value="Fake">Fake</option>
                    </select>
                    {/* Score Input */}
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={item.score}
                      onChange={(e) =>
                        setHistory(
                          history.map((h) =>
                            h._id === item._id
                              ? { ...h, score: e.target.value }
                              : h
                          )
                        )
                      }
                    />
                    <button
                      className="save"
                      onClick={() =>
                        handleSave(item._id, item.text, item.status, item.score)
                      }
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <div >
                    <div >
                      <strong>{item.headline || item.text}</strong> - {item.status} (
                      {item.score}
                      %)
                    </div>
                    <div style={{marginTop:"10px"}}>
                    <button
                      className="edit"
                      onClick={() => handleEdit(item._id)}
                      style={{margin:"4px" , borderRadius:"10px"}}
                      >
                      Edit
                    </button>
                    <button
                    style={{margin:"4px" , borderRadius:"10px"}}
                      className="delete"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>

                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default App;
