// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BookList = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       const res = await axios.get('/api/books');
//       setBooks(res.data);
//     };
//     fetchBooks();
//   }, []);

//   return (
//     <div>
//       {books.map(book => (
//         <div key={book._id}>
//           <h3>{book.title}</h3>
//           <p>{book.author}</p>
//           <p>{book.genre}</p>
//           <p>{book.condition}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BookList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get('/api/books', { params: { page, limit: 10 }});
                //setBooks(res.data);
                setBooks(res.data.books);
                setTotalPages(res.data.totalPages);
            } catch (err) {
                console.error(err);
            }
        };

        fetchBooks();
    }, [page]);

//     return (
//         <div>
//             <h2>Book List</h2>
//             <ul>
//                 {books.map(book => (
//                     <li key={book._id}>
//                         {book.title} by {book.author}
//                         {/* Add buttons to edit and delete books */}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

return (
  <div className="container">
      <h2 className="mt-4">Book List</h2>
      <ul className="list-group">
          {books.map(book => (
              <li key={book._id} className="list-group-item">
                  {book.title} by {book.author}
              </li>
          ))}
      </ul>
  </div>
);
};

export default BookList;


