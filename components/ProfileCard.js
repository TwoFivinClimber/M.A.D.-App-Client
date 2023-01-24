import React from 'react';
import {
  Card, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

function ProfileCard({ userObj }) {
  return (
    <Card className="user-Profile-Card">
      <div className="user-Profile-Image">
        <Image variant="start" className="user-profile-image" thumbnail src={userObj?.image} />
      </div>
      <div className="profile-Info-Div">
        <Card.Title>{userObj.name}</Card.Title>
        <Card.Text>{userObj.tag}</Card.Text>
        <Card.Text>{userObj.location}</Card.Text>
        <Card.Text>{userObj.age}</Card.Text>
      </div>
      <div className="profile-Interest-Div">
        <h6>Interests</h6>
        {userObj.interests.map((interest) => (
          <Card.Text>{interest.category.name}</Card.Text>
        ))}
      </div>
    </Card>
  );
}

ProfileCard.propTypes = {
  userObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    tag: PropTypes.string,
    age: PropTypes.string,
    location: PropTypes.string,
    interests: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        category: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      }),
    ),
    id: PropTypes.number,
  }).isRequired,
};

export default ProfileCard;
