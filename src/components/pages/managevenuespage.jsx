import React from 'react';
import useAPI from '../useApi';
import DocumentMeta from 'react-document-meta';
import { Link } from 'react-router-dom';


export function ManageVenuesPage(){
  const metatags = {
    title: 'Holidaze | Manage venues',
    description:
      'Welcome to Holidaze, your ultimate travel companion. We are all about making it easy to find the perfect place to stay, so you can focus on having the adventure of a lifetime.',
    meta: {
      charset: 'utf-8',
      name: {
        keywords:
          'holidaze, venues, accommodation, , holiday, booking, vacay, vacation, living, hotel',
      },
    },
  };

    const userName = localStorage.getItem('Name');
    const { data, isLoading, hasError } = useAPI('https://api.noroff.dev/api/v1/holidaze/profiles/' + userName + '?_bookings=true&_venues=true', 'GET');

    if (isLoading) {
        return (
            <div>Loading</div>
        );
        }
    if (hasError){
        return <div>Error has occured, refresh please</div>

    }
    
    
    return (
      <>
          <DocumentMeta {...metatags} />
          <main className='min-vh-100'>
              <div className='container mt-5'>
                  <div className='row justify-content-center'>
                      <div className='col text-center'>
                          <h1 className='text-center mb-4'>Your Venues</h1>
                          <Link to='/createvenue/' className='btn btn-primary button my-5'>
                              Create New Venue
                          </Link>
                          <div className='row g-4'>
                              {data.venues && data.venues.length > 0 ? (
                                  data.venues.map((venue) => (
                                      <div className='col-lg-4' key={venue.id}>
                                          <div className='card h-100'>
                                              <img src={venue.media[0]} className='card-img-top' alt={venue.name} />
                                              <div className='card-body'>
                                                  <h5 className='card-title'>{venue.name}</h5>
                                                  {data.bookings && data.bookings.length > 0 ? (
                                                   <div>
                                                        <h6>Upcoming Bookings:</h6>
                                                        <ul className='list-unstyled'>
                                                        {data.bookings.map((booking) => (
                                                            <li key={booking.id}>
                                                                <p >From: {booking.dateFrom.slice(0,10)} <br/> To: {booking.dateTo.slice(0,10)}</p>
                                                            </li>
                                                        ))}
                                                        </ul>
                                                  </div>
                                                  ) : (
                                                      <p>No current bookings</p>
                                                  )}
                                                  <div className='d-grid gap-2'>
                                                      <Link to={`/venue/${venue.id}`} className='btn btn-primary'>
                                                          View Venue
                                                      </Link>
                                                      <Link to={`/updatevenue/${venue.id}`} className='btn btn-secondary'>
                                                          Edit Venue
                                                      </Link>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  ))
                              ) : (
                                  <div className='col'>
                                      <div className='card text-center'>
                                          <div className='card-body'>
                                              <h5 className='card-title'>No venues managed</h5>
                                          </div>
                                      </div>
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
          </main>
      </>
  );
}
