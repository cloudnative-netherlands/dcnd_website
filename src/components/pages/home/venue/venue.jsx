import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import venue1 from './images/DCND-RM-008.jpg';
import venue2 from './images/DCND-RM-023.jpg';
import venue3 from './images/DCND-RM-024.jpg';
import venue4 from './images/DCND-RM-037.jpg';
import venue5 from './images/DCND-RM-071.jpg';
import venue6 from './images/DCND-RM-073.jpg';
import venue7 from './images/DCND-RM-185.jpg';
import venue8 from './images/DCND-YM-19.jpg';
import venue9 from './images/DCND-YM-150.jpg';

const IconMapPin = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Card = ({ children, className = '' }) => <div className={` ${className}`}>{children}</div>;

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setFade(true); // Startet die Animation
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          );
          setFade(false); // Entfernt die Animation
        }, 500); // Animation-Dauer (500ms) synchronisieren
      }, 5000); // Intervall für den Bildwechsel

      return () => clearInterval(timer);
    }
  }, [images.length, isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const goToPrevious = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
      setFade(false);
    }, 500);
  };

  const goToNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      setFade(false);
    }, 500);
  };

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full transition-all duration-500 ease-in-out">
        <img
          src={images[currentImageIndex]}
          alt={`Venue slide ${currentImageIndex + 1}`}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            fade ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
          {images.map((_, index) => (
            <button
              type="button"
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
          onClick={goToPrevious}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
          onClick={goToNext}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

const VENUE_IMAGES = [venue1, venue2, venue3, venue4, venue5, venue6, venue7, venue8, venue9];

const Venue = () => {
  const images = VENUE_IMAGES;
  return (
    <div className="mx-auto max-w-7xl p-4">
      <h2 className="section-title">DCND 2025 Vibe</h2>
      <div className="gap-8 ">
        <div className="flex flex-col gap-6">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
            <ImageSlider images={images} />
          </div>
          <Card>
            <div
              className="p-6"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div
                className="mb-4"
                style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
              >
                <h2 className="text-2xl font-bold text-[#21468B]">Supernova Jaarbeurs</h2>
                <h3 className="text-xl text-gray-600">at Utrecht Jaarbeurs</h3>
              </div>

              <div className="mb-4 flex gap-2 text-gray-600">
                <IconMapPin />
                <div>
                  <p>Jaarbeursplein 6</p>
                  <p>3521 AL Utrecht</p>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/PgUeuWL1JVk3F7G18"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-all"
                style={{ backgroundColor: '#21468B' }}
              >
                Open in Google Maps
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Venue;
