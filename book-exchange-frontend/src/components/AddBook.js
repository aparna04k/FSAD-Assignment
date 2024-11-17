import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        condition: ''
    });

    const { title, author, genre, condition } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/books/add', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="title" value={title} onChange={onChange} placeholder="Title" required />
            <input type="text" name="author" value={author} onChange={onChange} placeholder="Author" required />
            <input type="text" name="genre" value={genre} onChange={onChange} placeholder="Genre" required />
            <input type="text" name="condition" value={condition} onChange={onChange} placeholder="Condition" required />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBook;
