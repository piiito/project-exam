import React from 'react';
import useAPI from '../useApi';
import DocumentMeta from 'react-document-meta';
import { Link } from 'react-router-dom';


export function ViewBookingsPage() {
    const metatags = {
        title: 'Holidaze | View bookings',
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
    const { data, isLoading, isError } = useAPI('https://api.noroff.dev/api/v1/holidaze/profiles/'+userName+'?_bookings=true&_venues=true', 'GET');
    
    if (isLoading) {
        return (
            <div>Loading</div>
        );
        }
    if (isError){
        return <div>Error has occured, refresh please</div>

    }

   

    return (
     <>
        <DocumentMeta {...metatags}/>
        <main className='min-vh-100'>
            <div className='container mt-5'>
                <div className='row justify-content-center'>
                    <div className='col text-center'>
                    <h1 className='text-center mb-4'>Your Bookings</h1>
                    {data?.bookings?.length > 0 ? (
                        <div className='row g-4'>
                            {data.bookings.map(data => (
                                <div className='col-lg-4' key={data.id}>
                                    <div className='card h-100'>
                                        <div className='card-body'>
                                            <img src={data.venue.media} className='card-img-top 'style={{ objectFit: 'cover', height: '200px' }} alt={data.venue.name}/>
                                            <h5 className='card-title mt-2'>{data.venue.name} </h5>
                                            <div className='d-flex justify-content-between card-text my-1 px-1'><p className='card-text m-1 text-start'>Check-in</p><p className='card-text m-1 text-end'>{data.dateFrom.slice(0, 10)} </p></div>
                                            <div className='d-flex justify-content-between card-text my-1 px-1'><p className='card-text m-1 text-start'>Check-out</p><p className='card-text m-1 text-start'>{data.dateTo.slice(0,10)}</p></div>
                                            <div className='d-flex justify-content-between card-text my-1 px-1'><p className='card-text m-1 text-start'>Guests</p><p className='card-text m-1 text-start'>{data.venue.maxGuests}</p></div>
                                            <div className='d-flex justify-content-between card-text my-1 px-1'><p className='card-text m-1 text-start'>Rating</p><p className='card-text m-1 text-end'>{data.venue.rating}</p></div>
                                            <div className='d-flex justify-content-between card-text my-1 px-1'><p className='card-text m-1 text-start'>Adress</p><p className='card-text m-1 text-start'>{ data.venue.location.address}, {data.venue.location.zip} {data.venue.location.city}, {data.venue.location.country}</p></div>
                                            <button className='btn btn-primary m-2'>
                                                <Link to={'/venue/' + data.venue.id}>View Venue</Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='text-center'>No bookings available</div>
                    )}
                    </div>
                </div>
            </div>
        </main>
     </>
    );
};
