import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import useAPI from '../useApi';
import DocumentMeta from 'react-document-meta';


const API_URL = 'https://api.noroff.dev/api/v1/holidaze/venues';

function SearchVenues () {

  const { data } = useAPI(API_URL);
  const [ search, setSearch] = useState('');
  const [filteredSearch, setFilteredSearch] = useState([]);

  function onSearchInputChange(searchValue) {
      setSearch(searchValue);
      const results = data.filter(venue => {
        const name = venue.name;
        if (typeof name === 'string') {
            return name.toLowerCase().includes(searchValue.toLowerCase());
          }
          return false;
        });
        setFilteredSearch(results);
    };

  function onInputChange(event){
    onSearchInputChange(event.currentTarget.value);
    };

    return (
        <div>
          <input onChange={onInputChange} value={search} placeholder='Search for venues'/>
            {search !== '' ?
              <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-3'>
                {filteredSearch.map((venue) => (
                  <div key={venue.id} className='col'>
                    <div className='card d-flex flex-column h-100'>
                      <img src={venue.media} alt={venue.description} className='card-img-top' style={{ objectFit: 'cover', height: '200px' }}/>
                      <div className='card-body d-flex flex-column' style={{ height : '250px'}}>
                        <h5 className='card-title'>{venue.name}</h5>
                        <div className='d-flex justify-content-between card-text my-1 px-1'><p className='card-text m-1 text-start'>City:</p><p className='card-text m-1 text-end'>{venue.location.city}</p></div>
                        <div className='d-flex justify-content-between card-text my-1 px-1'><p className='card-text m-1 text-start'>Country:</p><p className='card-text m-1 text-start'>{venue.location.country}</p></div>
                        <div className='d-flex justify-content-between card-text my-1 px-1'><p className='card-text m-1 text-start'>Per night:</p><p className='card-text m-1 text-start'>{venue.price}$</p></div>
                        <div className='mt-auto d-grid gap-2'>
                          <button className='btn btn-primary'>
                            <Link to={'/venue/'+venue.id}>View venue</Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            : ''}
        </div>
    )
}


export function HomePage(){

  const metatags= {
    title: 'Holidaze | Home',
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

  const { data , isLoading, hasError } = useAPI(API_URL);

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
    <DocumentMeta {...metatags}/>
    <main className='min-vh-100'>
      <div className='container'>
        <h1 className='text-center mb-3'>Venues</h1>
        <div className='text-center pb-3'>
          <SearchVenues />
        </div>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4'>
          {data.map((data) => (
            <div className='col' key={data.id}>
              <div className='card p-2 d-flex flex-column h-100'>
                <img src={data.media} alt={data.description} className='card-img-top'style={{ objectFit: 'cover', height: '200px' }}/>
                <div className='card-body d-flex flex-column' style={{ height: '250px' }}> 
                    <h5 className='card-title'>{data.name}</h5>
                    <div className='d-flex justify-content-between card-text my-1 px-1'><p className='card-text m-1 text-start'>City:</p><p className='card-text m-1 text-end'>{data.location.city}</p></div>
                    <div className='d-flex justify-content-between card-text my-1 px-1'><p className='card-text m-1 text-start'>Country:</p><p className='card-text m-1 text-start'>{data.location.country}</p></div>
                    <div className='d-flex justify-content-between card-text my-1 px-1'><p className='card-text m-1 text-start'>Per night:</p><p className='card-text m-1 text-start'>{data.price}$</p></div>
                  <div className='mt-auto d-grid gap-2'>
                    <button className='btn btn-primary'>
                      <Link to={'/venue/' + data.id}>View venue</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
    </>
  );
}