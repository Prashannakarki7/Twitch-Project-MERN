import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5555/api/user/get-user-info', { credentials: 'include' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('User not authenticated');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data: ', data);
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching user data:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading-message">Loading...</div>;
    }

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <h1 className="profile-title">Welcome Back, {user.username || "N/A"}!</h1>
                    <p className="profile-subtitle">Here is your profile information</p>
                </div>
                <div className="profile-picture">
                    <img src={user.profilePicture} alt={user.username || "N/A"} className="profile-img" />
                </div>
                <div className="profile-details">
                    <div className="profile-detail">
                        <strong>Email:</strong>
                        <p>{user.email || "N/A"}</p>
                    </div>
                    <div className="profile-detail">
                        <strong>Bio:</strong>
                        <p>{user.bio || 'No bio available'}</p>
                    </div>
                </div>
                {/* <button className="edit-profile-button" onClick={() => navigate('/edit-profile')}>Edit Profile</button> */}
            </div>
        </div>
    );
};

export default Profile;