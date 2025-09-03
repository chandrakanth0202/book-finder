import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a book title to search.");
    onSearch({ title: title.trim(), author: author.trim() });
  }

  return (
    <form className="search-bar" onSubmit={submit}>
      <div className="inputs">
        <input
          className="input"
          placeholder="Book title (required)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input"
          placeholder="Author (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="controls">
        <button className="btn" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}
