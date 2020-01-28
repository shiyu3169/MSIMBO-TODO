import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Dashboard() {
  const params = useParams();
  const [imageToUpload, setImageToUpload] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/api/user/${params.id}`);
      setEmail(res.data.email);
      setDisplayName(res.data.displayName);
      setImage(res.data.image);
    };
    getUser();
  }, []);

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', imageToUpload);
    const res = await axios.post(`/api/image/${params.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setImage(res.data);
  };

  return (
    <div>
      {image ? (
        <img
          src={`data:${image.mimeType};base64,${new Buffer(image.data).toString(
            'base64'
          )}`}
          alt='user'
          width='100'
        />
      ) : null}
      <form onSubmit={handleUpload}>
        <input
          type='file'
          onChange={e => {
            setImageToUpload(e.target.files[0]);
          }}
        />
        <button>Upload</button>
      </form>
    </div>
  );
}
