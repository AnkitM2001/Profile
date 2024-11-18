import React, { useState } from 'react';
import axios from 'axios';
import './ProfileCard.css';

function ProfileCard() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="profile-card">
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchData}>Fetch Profile</button>

      {loading && <p>Loading...</p>}

      {userData && (
        <div className="profile-details">
          <img src={userData.avatar_url} alt={userData.name} />
          <h2>{userData.name}</h2>
          <p>{userData.bio}</p>
          <p>Followers: {userData.followers}</p>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
