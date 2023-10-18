import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { api } from '~/utils/api'; // Import the api object from your utils

const EditProfile = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: session?.user.name || '',
    bio: session?.user.bio || '',
  });
  const [successMessage, setSuccessMessage] = useState(null);

  const updateProfileInfo = api.profile.updateProfileInfo.useMutation(); // Call the mutation function

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfileInfo(formData); // Use the mutation function
      setSuccessMessage('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Edit Your Profile</h1>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows="4"
          />
        </div>
        <div>
          <button type="submit">Update Profile</button>
        </div>
      </form>
      <Link href={`/profiles/${session.user.id}`}>Back to Profile</Link>
    </div>
  );
};

export default EditProfile;
