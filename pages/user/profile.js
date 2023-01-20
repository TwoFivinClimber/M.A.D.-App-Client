/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Card, Dropdown, DropdownButton, Image,
} from 'react-bootstrap';
import { FaEllipsisV } from 'react-icons/fa';
import { getEventsByUid } from '../../api/events/eventData';
import { getUser, deleteUser } from '../../api/user/userData';
import EventCardNew from '../../components/EventCardNew';
import { signOut } from '../../utils/auth';
import { useAuth } from '../../utils/context/authContext';

function UserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState([]);
  const [content, setContent] = useState([]);
  const router = useRouter();
  const renderArray = content.sort((a, b) => b.date - a.date);

  const getTheContent = () => {
    getEventsByUid(user.id).then(setContent);
    getUser(user.id).then(setProfile);
  };

  useEffect(() => {
    getTheContent();
  }, [router]);

  const deleteThisUser = () => {
    if (window.confirm('Be Careful! This will delete all of your posts.  Ae you sure ?')) {
      deleteUser(user.id, user.uid).then(signOut);
      router.push('/');
    }
  };

  return (
    <>
      <Card className="user-Profile-Card">
        <div className="user-Profile-Image">
          <Image variant="start" className="user-profile-image" thumbnail src={user.image} />
        </div>
        <div className="profile-Info-Div">
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>{user.tag}</Card.Text>
          <Card.Text>{user.location}</Card.Text>
          <Card.Text>{user.age}</Card.Text>
        </div>
        <div className="profile-Interest-Div">
          <h6>Interests</h6>
          {profile.interests?.map((interest) => (
            <Card.Text>{interest.category.name}</Card.Text>
          ))}
        </div>
        <DropdownButton align="end" variant="secondary" className="profile-dropdown" title={<FaEllipsisV />}>
          <Dropdown.Item className="drop-Down-Item" onClick={() => router.push(`/user/edit/${user.id}`)}>Edit Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={deleteThisUser}>Delete Profile</Dropdown.Item>
        </DropdownButton>
      </Card>
      <h4 className="profile-events-header">Post Count: {content.length}</h4>
      <div className="user-Events-Div">
        {renderArray.map((event) => (
          <EventCardNew obj={event} onUpdate={getTheContent} />
        ))}
      </div>
    </>
  );
}
export default UserProfile;
