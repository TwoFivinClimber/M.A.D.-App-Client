import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleEvent } from '../../../api/events/eventData';
import EventForm from '../../../components/EventForm';

function EditEvent() {
  const [event, setEvent] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getTheContent = () => {
    getSingleEvent(firebaseKey).then(setEvent);
  };

  useEffect(() => {
    getTheContent();
  }, [firebaseKey]);

  return (
    <EventForm obj={event} onUpdate={getTheContent} />
  );
}

export default EditEvent;
