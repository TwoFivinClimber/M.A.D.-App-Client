import React, { useEffect, useState } from 'react';
import { getPublicEvents } from '../api/events/eventData';
// import EventCard from '../components/EventCard';
import EventCardNew from '../components/EventCardNew';

function BrowseEvents() {
  const [events, setEvents] = useState([]);
  const eventsDateSort = events?.sort((a, b) => Date.parse(b.date, 'mm-dd-yyyy') - Date.parse(a.date, 'mm-dd-yyyy'));

  const getTheEvents = () => {
    getPublicEvents().then(setEvents);
  };

  useEffect(() => {
    getTheEvents();
  }, []);

  return (
    <div>
      <h4>Browse Events</h4>
      <div className="browse-Events-div">
        {eventsDateSort?.map((event) => (
          <EventCardNew key={event.firebaseKey} obj={event} onUpdate={getTheEvents} />
        ))}
      </div>
    </div>
  );
}

export default BrowseEvents;
