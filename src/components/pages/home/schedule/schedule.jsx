import React, { useEffect, useState } from 'react';

import {
  SESSIONIZE_GRID_URL as scriptUrl,
  SESSIONIZE_SPEAKERS_URL as speakerURL,
} from 'constants/sessionize';

import ScheduleCard from '../../schedule/schedule/ScheduleCard';

import './schedule.css';

const TITLE = 'Schedule';
const DESCRIPTION =
  "Get ready for two action-packed days. With multiple tracks and a diverse range of sessions to choose from, you'll have plenty of opportunities to learn from experts in the field.";

const VISIBLE_EVENT_TYPES = ['talk', 'workshop'];

const calculateDuration = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const duration = (endDate - startDate) / 1000 / 60;
  return Math.round(duration);
};

const determineEventType = (room, session) => {
  if (session && session.isServiceSession) return 'service';
  if (room.toLowerCase().includes('workshop')) return 'workshop';
  if (room.toLowerCase().includes('sponsor')) return 'sponsor';
  return 'talk';
};

const convertSessionsToEvents = (data) => {
  const events = [];
  data.forEach((day) => {
    day.rooms.forEach((room) => {
      const filteredSessions = room.sessions.filter((session) => {
        return (
          session.status === "Accepted" &&
          session.isInformed === true &&
          session.isConfirmed === true &&
          !session.isServiceSession
        );
      });

      const roomEvents = filteredSessions.map((session) => ({
        id: session.id,
        title: session.title,
        description: session.description || '',
        time: new Date(session.startsAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        endTime: new Date(session.endsAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        duration: calculateDuration(session.startsAt, session.endsAt),
        room: room.name,
        type: determineEventType(room.name, session),
        speakers: session.speakers,
        start: session.startsAt,
        end: session.endsAt,
        isServiceSession: session.isServiceSession || false,
      }));
      events.push(...roomEvents);
    });
  });
  return events;
};

const Schedule = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [speakerData, setSpeakerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessionCount, setSessionCount] = useState(0);

  const findSpeakerProfile = (speakerId) => {
    const speaker = speakerData.find((s) => s.id === speakerId);
    return speaker ? speaker.profilePicture : '/placeholder.svg?height=40&width=40';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [speakersResponse, eventsResponse] = await Promise.all([
          fetch(speakerURL),
          fetch(scriptUrl),
        ]);
        const speakersData = await speakersResponse.json();
        const eventsData = await eventsResponse.json();

        setSpeakerData(speakersData);

        // Events aufbereiten wie im großen Schedule
        const allEvents = convertSessionsToEvents(eventsData);

        // Filtere nach gewünschten Typen
        const filteredEvents = allEvents.filter(event =>
          VISIBLE_EVENT_TYPES.includes(event.type)
        );

        setSessionCount(filteredEvents.length);

        // Zufällig 2 Events auswählen
        const shuffled = [...filteredEvents].sort(() => 0.5 - Math.random());
        setFeaturedEvents(shuffled.slice(0, 2));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hide the section entirely until the schedule is published in Sessionize
  if (!loading && featuredEvents.length === 0) {
    return null;
  }

  return (
    <section className="safe-paddings relative bg-white pb-20 pt-20 lg:pb-32 md:py-24 sm:py-16" id="agenda">
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 items-start gap-12 sm:grid-cols-1 xs:grid-cols-1">
            <div>
              <h2 className="section-title">{TITLE}</h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-600">{DESCRIPTION}</p>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                {/*
  <div className="flex items-center gap-2">
    <span className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 text-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-1"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
      {loading ? '...' : `${sessionCount} Sessions`}
    </span>
  </div>
*/}

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    2 Days
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="button"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  window.location.href = '/agenda';
                }}
              >
                View full schedule
              </button>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div>Loading sessions...</div>
              ) : (
                featuredEvents.map((event) => (
                  <ScheduleCard
                    key={event.id}
                    startTime={event.time}
                    endTime={event.endTime}
                    duration={`${event.duration} min`}
                    title={event.title}
                    speakers={event.speakers?.map(speaker => ({
                      name: speaker.name,
                      avatar: findSpeakerProfile(speaker.id)
                    }))}
                    location={event.room}
                    type={event.type}
                    isFavorite={true}
                    isLive={false}
                    onFavoriteClick={() => { }}
                    onClick={() => window.location.href = '/agenda'}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
