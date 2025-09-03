import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import BookModal from "./components/BookModal";

const RESULTS_PER_PAGE = 20;

export default function App() {
  const [queryTitle, setQueryTitle] = useState("");
  const [queryAuthor, setQueryAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [numFound, setNumFound] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  async function fetchBooks(title, author, pageNumber = 1) {
    if (!title || title.trim().length === 0) {
      setBooks([]);
      setNumFound(0);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      params.set("title", title);
      if (author && author.trim()) params.set("author", author);
      params.set("limit", RESULTS_PER_PAGE.toString());
      params.set("page", pageNumber.toString());

      const url = `https://openlibrary.org/search.json?${params.toString()}`;
      const res = await fetch(url);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setBooks(data.docs ?? []);
      setNumFound(data.numFound ?? 0);
    } catch (err) {
      setError(err.message || "Unknown error");
      setBooks([]);
      setNumFound(0);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch({ title, author }) {
    setQueryTitle(title);
    setQueryAuthor(author);
    setPage(1);
    fetchBooks(title, author, 1);
  }

  function goToPage(newPage) {
    if (newPage < 1) return;
    const totalPages = Math.max(1, Math.ceil(numFound / RESULTS_PER_PAGE));
    if (newPage > totalPages) return;
    setPage(newPage);
    fetchBooks(queryTitle, queryAuthor, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const totalPages = Math.max(1, Math.ceil(numFound / RESULTS_PER_PAGE));

  return (
    <div className="app-root">
      <header className="header">
        <h1>Book Finder</h1>
        <p className="sub">Search books using Open Library API</p>
      </header>

      <main className="container">
        <SearchBar onSearch={handleSearch} />

        <section className="status-row">
          {loading && <div className="info">Loading…</div>}
          {!loading && queryTitle && (
            <div className="info">
              Found <strong>{numFound}</strong> results for <em>"{queryTitle}"</em>
              {queryAuthor ? <> by <em>{queryAuthor}</em></> : null}
            </div>
          )}
          {error && <div className="error">Error: {error}</div>}
        </section>

        <section className="results-grid">
          {books.length === 0 && !loading && queryTitle && (
            <div className="empty">No results found.</div>
          )}
          {books.map((b) => (
            <BookCard
              key={`${b.key}-${b.cover_i ?? Math.random()}`}
              book={b}
              onOpen={() => setSelectedBook(b)}
            />
          ))}
        </section>

        {numFound > 0 && (
          <nav className="pagination">
            <button onClick={() => goToPage(page - 1)} disabled={page <= 1}>
              ← Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button onClick={() => goToPage(page + 1)} disabled={page >= totalPages}>
              Next →
            </button>
          </nav>
        )}

        <footer className="footer">
          <small>
            Data from{" "}
            <a href="https://openlibrary.org" target="_blank" rel="noreferrer">
              Open Library
            </a>
          </small>
        </footer>
      </main>

      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}
