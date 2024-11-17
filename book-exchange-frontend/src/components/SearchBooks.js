import React, { useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        condition: ''
    });
    const [results, setResults] = useState([]);

    const { title, author, genre, condition } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/books/search', {
                headers: { Authorization: `Bearer ${token}` },
                params: formData
            });
            setResults(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" name="title" value={title} onChange={onChange} placeholder="Title" />
                <input type="text" name="author" value={author} onChange={onChange} placeholder="Author" />
                <input type="text" name="genre" value={genre} onChange={onChange} placeholder="Genre" />
                <input type="text" name="condition" value={condition} onChange={onChange} placeholder="Condition" />
                <button type="submit">Search</button>
            </form>
            <ul>
                {results.map(book => (
                    <li key={book._id}>
                        {book.title} by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBooks;
