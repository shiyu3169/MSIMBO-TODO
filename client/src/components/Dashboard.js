import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Dashboard() {
  const params = useParams();
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [image, setImage] = useState('');
  const [imageToUpload, setImageToUpload] = useState('');

  useEffect(() => {
    getUser();
    //eslint-disable-next-line
  }, [params.id]);
  const getUser = async () => {
    const res = await axios.get(`/api/user/${params.id}`);
    const user = res.data;
    setEmail(user.email);
    setDisplayName(user.displayName);
    setImage(user.image);
  };

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
          width='200'
        />
      ) : null}
      <form onSubmit={handleUpload}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='displayName'>Display Name</label>
          <input
            type='text'
            name='displayName'
            id='displayName'
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='image'>Profile Image</label>
          <input
            type='file'
            name='image'
            id='image'
            onChange={e => setImageToUpload(e.target.files[0])}
          />
        </div>
        <button>Upload</button>
      </form>
    </div>
  );
}
