/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Card, Carousel, Dropdown, DropdownButton,
} from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import { FaEllipsisV } from 'react-icons/fa';
import Moment from 'moment';
import { useAuth } from '../../utils/context/authContext';
import CommentForm from '../../components/CommentForm';
import { getComments } from '../../api/comments/commentData';
import CommentCard from '../../components/CommentCard';
import { getSingleEvent, deleteEvent } from '../../api/events/eventData';

function ViewEvent() {
  const [event, setEvent] = useState({});
  const [comments, setComments] = useState([]);
  const [commentToUpdate, setCommentToUpdate] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  const getTheContent = () => {
    getSingleEvent(firebaseKey).then(setEvent);
    getComments(firebaseKey).then(setComments);
  };

  useEffect(() => {
    getTheContent();
  }, [firebaseKey, user]);

  const deleteThisEvent = () => {
    if (window.confirm('Are You Sure ?')) {
      deleteEvent(event.id).then(() => {
        router.push('/user/profile');
      });
    }
  };

  return (
    <Card className="view-Day-Header">
      <Card.Body>
        <div className="view-day-head">
          <div className="view-day-user">
            <Card.Img className="round-User-Img" src={event.uid?.image} />
            <Card.Text className="view-day-username">{event.uid?.name}</Card.Text>
          </div>
          <div className="view-day-dropdown">
            <DropdownButton align="end" variant="secondary" className="card-Dropdown" title={<FaEllipsisV />}>
              {user.id === event.uid?.id ? (
                <><Dropdown.Item className="drop-Down-Item" onClick={() => router.push(`/event/edit/${event.firebaseKey}`)}>Edit</Dropdown.Item><><Dropdown.Divider /><Dropdown.Item className="drop-Down-Item" onClick={deleteThisEvent}>Delete This Day</Dropdown.Item></></>
              ) : ('')}
            </DropdownButton>
          </div>
        </div>
        <Carousel fade className="event-page-carousel">
          {event.photos?.map((image) => (
            <Carousel.Item key={image.id}>
              <img
                className="event-page-images d-block"
                src={image.url}
                alt="First slide"
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="view-day-details">
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>{event.city}</Card.Text>
            <Card.Text className="comment-card-date">{Moment(event.date).format('MM-DD-YYYY')}</Card.Text>
            <Rating
              name="starRating"
              allowHover={false}
              showTooltip
              allowHalfIcon
              ratingValue={event.rating}
              readonly
              size={26}
              tooltipArray={['Bad', 'Bad', 'Not Bad', 'Not Bad', 'Good', 'Good', 'Great', 'Great', 'Awesome', 'M.A.D. Awesome']}
              tooltipStyle={{
                height: 'auto', width: 'auto', fontSize: '12px', padding: '2px 4px', textAlign: 'center', marginTop: '4px', marginLeft: '10px',
              }}
            />
          </Card.Body>
          <Card.Body className="view-day-description">
            <Card.Text>{event.description}</Card.Text>
          </Card.Body>
        </div>
      </Card.Body>
      <div className="comments-Div">
        <CommentForm obj={commentToUpdate} id={firebaseKey} onUpdate={getTheContent} />
        {comments?.map((comment) => (
          <CommentCard key={comment.firebaseKey} obj={comment} onUpdate={getTheContent} setCommentToUpdate={setCommentToUpdate} />
        ))}
      </div>
    </Card>
  );
}

export default ViewEvent;
