/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import { Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
// import { getPublicEvents } from '../api/events/eventData';
// import EventCard from '../components/EventCard';
import { getRandomPublicEvent } from '../api/events/mergedEvents';
import EventCardNew from '../components/EventCardNew';
import { getRandomPublicDay } from '../api/day/mergedDayData';
import DayCardNew from '../components/DayCardNew';
// import { useAuth } from '../utils/context/authContext';
// import FeaturedCard from '../components/FeaturedCard';

function Home() {
  // const { user } = useAuth();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [featuredEvent, setFeaturedEvent] = useState({});
  const [featuredDay, setFeaturedDay] = useState({});

  const getFeatured = () => {
    getRandomPublicEvent().then(setFeaturedEvent);
    getRandomPublicDay().then(setFeaturedDay);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (e.key === 'Enter') {
      e.preventDefault();
      router.push({
        pathname: '/search',
        query: { keyword: searchInput },
      });
    } else {
      setSearchInput(value);
    }
  };

  useEffect(() => {
    getFeatured();
  }, []);

  return (
    <div>
      <div className="mainDiv">
        <Image className="backgroundImage" src="https://res.cloudinary.com/twofiveclimb/image/upload/v1662000538/IMG_8989_lgto2x.jpg" />
        <div className="mainHeadSearch">
          <h1>Find Your Day</h1>
          <Form>
            <Form.Control
              type="search"
              placeholder="Search by Event Title"
              className="me-2"
              aria-label="Search"
              value={searchInput}
              onChange={handleChange}
              onKeyDown={handleChange}
              name="keyword"
            />
          </Form>
        </div>
      </div>
      <div className="mainFeaturedDiv">
        <h3> Featured </h3>
        <div className="featuredContentDiv">
          <EventCardNew obj={featuredEvent} onUpdate={getFeatured} />
          <DayCardNew obj={featuredDay} onUpdate={getFeatured} />
        </div>
      </div>
    </div>
  );
}

export default Home;
