import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditBook = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        condition: ''
    });

    const { id } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`/api/books/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFormData({
                    title: res.data.title,
                    author: res.data.author,
                    genre: res.data.genre,
                    condition: res.data.condition
                });
            } catch (err) {
                console.error(err);
            }
        };

        fetchBook();
    }, [id]);

    const { title, author, genre, condition } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`/api/books/edit/${id}`, formData, {
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
            <button type="submit">Edit Book</button>
        </form>
    );
};

export default EditBook;
