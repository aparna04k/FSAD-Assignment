import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({
        bio: '',
        location: '',
        favoriteGenres: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    const { bio, location, favoriteGenres } = profile;

    const onChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put('/api/profile', profile, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="bio" value={bio} onChange={onChange} placeholder="Bio" />
            <input type="text" name="location" value={location} onChange={onChange} placeholder="Location" />
            <input type="text" name="favoriteGenres" value={favoriteGenres} onChange={onChange} placeholder="Favorite Genres" />
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default Profile;
