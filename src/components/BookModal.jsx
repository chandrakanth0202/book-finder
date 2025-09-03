import React from "react";

export default function BookModal({ book, onClose }) {
  if (!book) return null;

  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : book.isbn && book.isbn[0]
    ? `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-L.jpg`
    : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>{book.title}</h2>
          <button className="close" onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="modal-body">
          {cover && <img src={cover} className="modal-cover" alt={`${book.title} cover`} />}
          <div className="modal-info">
            <p>
              <strong>Author(s):</strong> {(book.author_name || []).join(", ") || "—"}
            </p>
            <p>
              <strong>First published:</strong> {book.first_publish_year ?? "—"}
            </p>
            <p>
              <strong>Publisher:</strong>{" "}
              {(book.publisher || []).slice(0, 3).join(", ") || "—"}
            </p>
            {book.subject && (
              <p>
                <strong>Subjects:</strong>{" "}
                {(book.subject || []).slice(0, 8).join(", ")}
              </p>
            )}
            <p>
              <a
                href={`https://openlibrary.org${book.key}`}
                target="_blank"
                rel="noreferrer"
              >
                View on Open Library ↗
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
