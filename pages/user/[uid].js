/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPublicContentByUser } from '../../api/events/mergedEvents';
import { getUser } from '../../api/user/userData';
import DayCardNew from '../../components/DayCardNew';
import EventCardNew from '../../components/EventCardNew';
import ProfileCard from '../../components/ProfileCard';
// import { useAuth } from '../../utils/context/authContext';

function UserPage() {
  // const { user } = useAuth();
  const [pageUser, setPageUser] = useState({});
  const [content, setContent] = useState([]);
  const router = useRouter();
  const { uid } = router.query;

  const getTheContent = () => {
    getUser(uid).then((userArray) => {
      setPageUser(userArray[0]);
      getPublicContentByUser(uid).then(setContent);
    });
  };

  useEffect(() => {
    getTheContent();
  }, [router]);

  return (
    <>
      <ProfileCard userObj={pageUser} />
      <h4 className="user-page-events-header">Events</h4>
      <div className="userEventsDiv">
        {content.map((event) => (
          event.category ? <EventCardNew key={event.firebaseKey} obj={event} onUpdate={getTheContent} /> : <DayCardNew obj={(event)} key={event.firebaseKey} onUpdate={getTheContent} />
        ))}
      </div>
    </>
  );
}
export default UserPage;
