import { useState, useEffect } from 'react';

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/session/current', {
          method: 'GET',
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Error fetching current user');
        }
        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading };
};

export default useProfile;