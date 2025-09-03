## Book Finder

A simple and professional web application that allows users to search for books using the Open Library API 
 Link - https://openlibrary.org/developers/api?utm_source=chatgpt.com

Deployed Application: Book Finder on Netlify 
 link - https://lucky-fairy-ef225a.netlify.app/?utm_source=chatgpt.com

##  Features

1. Search for books by title.
2. Display book covers (when available).
3. Show author names and first published year.
4. Responsive design (works on desktop & mobile).
5. Fast and lightweight (built with React + Vite).
6. Graceful error handling (shows message if no results found).

## Tech Stack

1.Frontend Framework: React (Vite)
2.Styling: CSS Grid + Flexbox (custom CSS)
3.API: Open Library Search API
4.Deployment: Netlify

## Project Structure

book-finder/
│── public/               # Static assets
│── src/
│   ├── App.jsx           # Main application logic
│   ├── App.css           # Styling
│   └── main.jsx          # Entry point
│── package.json          # Dependencies & scripts
│── README.md             # Project documentation

## Installation & Setup

Clone the repository :

git clone https://github.com/your-username/book-finder.git
cd book-finder


# Install dependencies

npm install


# Run development server

npm run dev


# Open your browser at:

http://localhost:5173

## Deployment

This project is deployed on Netlify:
👉 https://lucky-fairy-ef225a.netlify.app/

# To deploy your own:

1.Push the code to GitHub.
2.Connect your repo to Netlify.
3.It will auto-deploy on every git push.

## Example Usage

1.Enter a book title like harry potter.
2.Results will show book covers, authors, and first published year.
3.If no results are found → a friendly message appears.

## API Reference

Open Library Search API:

https://openlibrary.org/search.json?title={bookTitle}


{bookTitle} → replace with user input.

Returns book details including title, author, cover ID, and first published year.

## Future Improvements

1.Add a loading spinner when fetching results.
2.Show publisher and edition count.
3.Add clear search button.
4.Enhance accessibility (labels, ARIA roles).

 
