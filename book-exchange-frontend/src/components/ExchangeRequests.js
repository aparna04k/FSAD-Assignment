import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExchangeRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/exchange', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRequests(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRequests();
    }, []);

    const respondToRequest = async (requestId, status) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`/api/exchange/respond/${requestId}`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div>
            <h2>Exchange Requests</h2>
            <ul>
                {requests.map(request => (
                    <li key={request._id}>
                        {request.requester.username} requested your book
                        <button onClick={() => respondToRequest(request._id, 'accepted')}>Accept</button>
                        <button onClick={() => respondToRequest(request._id, 'rejected')}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExchangeRequests;
