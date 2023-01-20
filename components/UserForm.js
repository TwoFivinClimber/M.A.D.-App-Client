/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import AsyncCreatable from 'react-select/async-creatable';
import AsyncSelect from 'react-select/async';
import { getCategories } from '../api/categories';
import { useAuth } from '../utils/context/authContext';
import { createUser, updateUser } from '../api/user/userData';
import { getCity } from '../api/tom-tom';
import uploadPhoto from '../api/cloudinary';

const initialState = {
  id: 0,
  uid: '',
  name: '',
  image: '',
  tag: '',
  location: '',
  lat: 0,
  long: 0,
  age: '',
  interests: [],
};

function UserForm({ obj }) {
  const router = useRouter();
  const { user } = useAuth();
  const [input, setInput] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(input);
  };

  const handleLocationSelect = (selected) => {
    if (selected) {
      const {
        name, value, lat, long,
      } = selected;
      setInput((prevState) => ({
        ...prevState,
        [name]: value,
        lat,
        long,
      }));
    } else {
      setInput((prevState) => ({
        ...prevState,
        homeCity: '',
      }));
    }
  };

  const handleInterestSelect = (selected) => {
    setInput((prevState) => ({
      ...prevState,
      interests: selected,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateUser(input).then(() => router.push('/user/profile'));
    } else {
      createUser(input).then(() => router.push('/user/profile'));
    }
  };

  // TOM TOM API//
  const handleInput = (target) => new Promise((resolve, reject) => {
    getCity(target).then((cityArr) => {
      resolve(cityArr.filter((result) => result.value.toLowerCase().includes(target.toLowerCase())));
    }).catch(reject);
  });

  // IMAGE UPLOAD //
  const uploadImage = async (e) => {
    const payload = new FormData();
    payload.append('file', e.target.files[0]);
    payload.append('upload_preset', 'nofzejna');
    payload.append('cloud_name', 'twofiveclimb');
    await uploadPhoto(payload).then((url) => {
      setInput((prevState) => (
        {
          ...prevState,
          imageUrl: url,
        }
      ));
    });
  };

  useEffect(() => {
    if (obj.id) {
      const userInterests = obj.interests.map((int) => (
        {
          value: int.category.id,
          label: int.category.name,
        }
      ));
      setInput({
        name: obj.name,
        image: obj.image,
        tag: obj.tag,
        location: obj.location,
        lat: obj.lat,
        long: obj.long,
        age: obj.age,
        interests: userInterests,
      });
    } else {
      setInput((prevState) => ({
        ...prevState,
        uid: user.fbUser.uid,
        name: user.fbUser.displayName,
        image: user.fbUser.photoURL,
      }));
    }
  }, [obj]);

  return (
    <>
      <h4 className="user-form-header">{obj.id ? 'Edit' : 'Create'} Your Profile</h4>
      <div className="user-form-image-div">
        <Image variant="start" className="user-form-image" thumbnail roundedCircle src={input.image} />
        <div className="user-form-upload">
          <Form.Label>Upload Photo</Form.Label>
          <Form.Control type="file" onChange={uploadImage} />
        </div>
      </div>
      <Form className="user-form" onSubmit={handleSubmit}>
        <Form.Label>Profile Name</Form.Label>
        <Form.Control name="userName" value={input.name} onChange={handleChange} type="text" placeholder="Enter Profile Name" required />
        <Form.Label>Tag Line</Form.Label>
        <Form.Control name="tagLine" value={input.tag} onChange={handleChange} type="text" placeholder="Just Tryna Be Awesome" required />
        <Form.Label>Location </Form.Label>
        <AsyncCreatable
          classNamePrefix="select"
          backspaceRemovesValue
          isClearable
          onChange={handleLocationSelect}
          value={{ label: input.location, value: input.location }}
          loadOptions={handleInput}
        />
        <Form.Label>Age</Form.Label>
        <Form.Control name="age" value={input.age} onChange={handleChange} type="text" placeholder="Enter Your Age" required />

        <Form.Label>Interests</Form.Label>
        <AsyncSelect
          isMulti
          onChange={handleInterestSelect}
          defaultOptions
          value={input.interests}
          loadOptions={getCategories}
        />
        <br />
        <Button className="submit-btn" type="submit" variant="success">Submit</Button>
      </Form>
    </>
  );
}

UserForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    tag: PropTypes.string,
    location: PropTypes.string,
    lat: PropTypes.number,
    long: PropTypes.number,
    age: PropTypes.number,
    interests: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default UserForm;
