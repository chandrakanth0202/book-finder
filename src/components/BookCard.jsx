import React from "react";

function coverUrl(book) {
  if (book.cover_i) return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
  if (book.isbn && book.isbn.length) return `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`;
  return "https://via.placeholder.com/120x180?text=No+Cover";
}

export default function BookCard({ book, onOpen }) {
  return (
    <article className="book-card">
      <img className="cover" src={coverUrl(book)} alt={`${book.title} cover`} />
      <div className="meta">
        <h3 className="title">{book.title}</h3>
        <div className="authors">{(book.author_name || []).slice(0, 3).join(", ")}</div>
        <div className="meta-row">
          <span>{book.first_publish_year ?? "—"}</span>
          <span>{(book.publisher && book.publisher[0]) ?? ""}</span>
        </div>
        <div className="actions">
          <button className="btn small" onClick={() => onOpen(book)}>Details</button>
          {book.key && (
            <a
              className="link"
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noreferrer"
            >
              OpenLibrary
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
