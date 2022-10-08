/* eslint-disable react-hooks/exhaustive-deps */
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import { Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getRandomPublicEvent } from '../api/events/mergedEvents';
import EventCardNew from '../components/EventCardNew';
import { getRandomPublicDay } from '../api/day/mergedDayData';
import DayCardNew from '../components/DayCardNew';

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
      <div className="main-Div">
        <Image className="background-Image" src="https://res.cloudinary.com/twofiveclimb/image/upload/v1662000538/IMG_8989_lgto2x.jpg" />
        <div className="main-Head-Search">
          <h1 className="find-your-day">Find Your Day</h1>
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
      <div className="main-Featured-Div">
        <h3> Featured </h3>
        <div className="featured-Content-Div">
          <EventCardNew key={featuredEvent.firebaseKey} obj={featuredEvent} onUpdate={getFeatured} />
          <DayCardNew key={featuredDay.firebaseKey} obj={featuredDay} onUpdate={getFeatured} />
        </div>
      </div>
    </div>
  );
}

export default Home;
