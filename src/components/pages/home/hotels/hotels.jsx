import React from 'react';

const hotels = [
  {
    name: 'Hotel NH Utrecht',
    distance: '15 min walk',
    amenities: ['Restaurant'],
    imageUrl:
      'https://img.nh-hotels.net/Ye3r/n0ekz/original/RSP_NH_utrecht_068.jpg?output-quality=80&resize=1110:*&composite-to=center,center|1110:380&background-color=white',
    websiteUrl: 'https://www.nh-hotels.com/en/hotel/nh-utrecht',
  },
  {
    name: 'Hampton by Hilton Utrecht Central Station',
    websiteUrl: 'https://www.hilton.com/en/hotels/amsunhx-hampton-utrecht-central-station',
  },
  {
    name: 'The Anthony Hotel Utrecht',
    websiteUrl:
      'https://www.theanthony.nl/',
  },
];

export default function HotelList() {
  const [highlightedHotel, ...otherHotels] = hotels;

  return (
    <div style={{ maxWidth: '1284px', margin: '0 auto', padding: '16px' }}>
      <h2 className="section-title">Nearby hotels</h2>

      {/* Highlighted Hotel */}
      <div
        style={{
          marginBottom: '32px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <img
          src={highlightedHotel.imageUrl}
          alt={highlightedHotel.name}
          style={{ width: '100%', height: '300px', objectFit: 'cover' }}
        />
        <div style={{ padding: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
            {highlightedHotel.name}
          </h2>
          <p style={{ fontSize: '14px', color: '#777' }}>📍 {highlightedHotel.distance}</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <a
              href="https://www.nh-hotels.com/en/hotel/nh-utrecht"
              target="_blank" // Opens the link in a new window
              style={{
                display: 'block',
                textAlign: 'center',
                backgroundColor: '#004257',
                color: '#fff',
                padding: '10px 16px',
                borderRadius: '4px',
                textDecoration: 'none',
                minWidth: '10vw',
                marginTop: '1rem',
              }}
            >
              Book now
            </a>
          </div>
        </div>
      </div>

      {/* Other Hotels */}
      <div style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
          More hotels nearby
        </h3>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {otherHotels.map((hotel, index) => (
            <li
              key={index}
              style={{
                marginBottom: '16px',
                padding: '8px',
                borderBottom: '1px solid #ddd',
              }}
            >
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                {hotel.name}
              </h4>
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '4px' }}>
                {hotel.description}
              </p>
              <p style={{ fontSize: '14px', color: '#777', marginBottom: '8px' }} />
              <a
                href="mailto:info@hotel-arabellapark.de"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#004257',
                  textDecoration: 'none',
                  fontWeight: 'normal',
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
