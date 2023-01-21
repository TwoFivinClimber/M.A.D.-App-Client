/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  Card, Image, Dropdown, DropdownButton,
} from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import PropTypes from 'prop-types';
import { FaEllipsisV } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Carousel from 'react-bootstrap/Carousel';
import { deleteEvent } from '../api/events/mergedEvents';
import { useAuth } from '../utils/context/authContext';

const EventCardNew = ({ obj, onUpdate }) => {
  // const [images, setImages] = useState([]);
  // const [eventUser, setEventUser] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const [index, setIndex] = useState(0);

  // const getTheContent = () => {
  //   getSingleUserByUid(obj.uid).then((evUser) => {
  //     setEventUser(evUser);
  //   });
  //   getImagesByEvent(obj.firebaseKey).then(setImages);
  // };

  const deleteThisEvent = () => {
    if (window.confirm('Are You Sure ?')) {
      deleteEvent(obj.id).then(() => {
        onUpdate();
      });
    }
  };

  // useEffect(() => {
  //   getTheContent();
  // }, [obj]);

  const handleImageRotation = (selected) => {
    setIndex(selected);
  };

  return (
    <Card className="event-card">
      <div className="event-card-header">
        <div className="event-card-user">
          {obj.uid.id === user.id ? (
            <Link href="/user/profile" passHref>
              <Image className="comment-User-Image" src={obj.uid.image} />
            </Link>
          ) : (
            <Link href={`/user/${obj.uid.id}`} passHref>
              <Image className="comment-User-Image" src={obj.uid.image} />
            </Link>
          )}
          <Card.Text className="event-card-username">{obj.uid.name}</Card.Text>
        </div>
        <DropdownButton align="end" variant="secondary" className="event-card-dropdown" title={<FaEllipsisV />}>
          <Dropdown.Item className="drop-Down-Item" onClick={() => router.push(`/event/${obj.id}`)}>View</Dropdown.Item>
          {user.id === obj.uid.id ? (
            <>
              <Dropdown.Item className="drop-Down-Item" onClick={() => router.push(`/event/edit/${obj.id}`)}>Edit</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="drop-Down-Item" onClick={deleteThisEvent}>Delete</Dropdown.Item>
            </>
          ) : ('')}
        </DropdownButton>
      </div>
      <div className="event-card-carousel">
        <Carousel activeIndex={index} onSelect={handleImageRotation} interval={null}>
          {obj.photos?.map((photo) => (
            <Carousel.Item key={photo.id}>
              <img
                className="event-card-image d-block w-100"
                src={photo.url}
                alt="user posted content"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <Card.Body className="event-card-body">
        <div className="event-card-title">
          <Card.Title className="event-card-title">{obj.title}</Card.Title>
          {/* <Card className="event-card-time-of-day">{obj.timeOfDay}</Card> */}
        </div>
        <div className="event-card-location">
          <Card.Text>{obj.location}</Card.Text>
          <Card.Text>{obj.city}</Card.Text>
        </div>
        <div className="event-card-rating">
          <Rating
            name="starRating"
            allowHover={false}
            showTooltip
            allowHalfIcon
            className="star-rating"
            tooltipClassName="star-rating-tooltip"
            tooltipArray={['Bad', 'Bad', 'Not Bad', 'Not Bad', 'Good', 'Good', 'Great', 'Great', 'Awesome', 'M.A.D. Awesome']}
            tooltipStyle={{
              height: 'auto', width: 'auto', fontSize: '10px', padding: '2px 4px', textAlign: 'center', marginTop: '4px', marginLeft: '10px',
            }}
            ratingValue={obj.rating}
            size={20}
            readonly
          />
        </div>
      </Card.Body>
    </Card>
  );
};

EventCardNew.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    date: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    location: PropTypes.string,
    city: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
    public: PropTypes.bool,
    uid: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.string,
    }),
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      }),
    ),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCardNew;
