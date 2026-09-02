import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import {
  SESSIONIZE_GRID_URL as scriptUrl,
  SESSIONIZE_SESSIONS_URL as sessionsUrl,
  SESSIONIZE_SPEAKERS_URL as speakerURL,
} from 'constants/sessionize';

import './schedule.css';
import ScheduleCard from './ScheduleCard';

const typeLabels = {
  talk: 'Talks',
  workshop: 'Workshops',
  sponsor: 'Sponsor Talks',
  service: 'Service Sessions',
  keynote: 'Keynotes',
  lightning: 'Lightning Talks',
};

const Schedule = ({ dayIndex = null }) => {
  const [speakerData, setSpeakerData] = useState([]);
  const [gridData, setGridData] = useState([]); // Raw grid data
  const [events, setEvents] = useState([]); // Flat list of events
  const [rooms, setRooms] = useState([]); // List of rooms for selected day
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [topicsById, setTopicsById] = useState({}); // sessionId -> topic names
  const [currentTime, setCurrentTime] = useState(new Date());
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [sessionFilters, setSessionFilters] = useState({
    showServiceSessions: true,
  });


  // Helper: Get date for selectedDay
  const getDateForSelectedDay = () => gridData[selectedDay] || gridData[0] || null;

  // Helper: Convert sessions to flat events
  const convertSessionsToEvents = (data, filters, topicsMap = topicsById) => {
    const events = [];
    data.forEach((day) => {
      day.rooms.forEach((room) => {
        const filteredSessions = room.sessions.filter((session) => {
          if (filters.showServiceSessions && session.isServiceSession) {
            return true;
          }
          // isConfirmed is deliberately not required: accepted, informed sessions stay
          // visible while a speaker's confirmation is still pending in Sessionize
          return (
            session.status === 'Accepted' &&
            session.isInformed === true &&
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
          topics: topicsMap[session.id] || [],
        }));
        events.push(...roomEvents);
      });
    });
    // Talks with nothing running in parallel address the whole audience: before the
    // parallel tracks start they are keynotes, after that they are lightning talks
    const isLoneEvent = (event) =>
      !events.some((other) => other.id !== event.id && eventsOverlap(other, event));
    const firstParallelStartByDay = {};
    events.forEach((event) => {
      if (isLoneEvent(event)) return;
      const day = new Date(event.start).toDateString();
      if (
        !firstParallelStartByDay[day] ||
        new Date(event.start) < new Date(firstParallelStartByDay[day])
      ) {
        firstParallelStartByDay[day] = event.start;
      }
    });
    return events.map((event) => {
      if (event.type !== 'talk' || !isLoneEvent(event)) return event;
      const firstParallel = firstParallelStartByDay[new Date(event.start).toDateString()];
      const isBeforeTracks = !firstParallel || new Date(event.start) < new Date(firstParallel);
      return { ...event, type: isBeforeTracks ? 'keynote' : 'lightning' };
    });
  };

  // Helper: Calculate duration in minutes
  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = (endDate - startDate) / 1000 / 60;
    return Math.round(duration);
  };

  // Helper: Determine event type by room name or session
  const determineEventType = (room, session) => {
    // Service first: breaks are flagged as both service and plenum in Sessionize
    if (session && session.isServiceSession) return 'service';
    if (session && session.isPlenumSession) return 'keynote';
    // Long-format sessions (90+ min) are hands-on workshops even when Sessionize
    // records them as regular sessions
    if (session && calculateDuration(session.startsAt, session.endsAt) >= 90) return 'workshop';
    if (room.trim().toLowerCase() === 'quest') return 'workshop';
    if (room.toLowerCase().includes('workshop')) return 'workshop';
    if (room.toLowerCase().includes('sponsor')) return 'sponsor';
    return 'talk';
  };

  // Helper: Filter events by type/favorites
  const filterEvents = (events) => {
    if (selectedType === 'all') return events;
    if (selectedType === 'favorites') {
      return events.filter((event) => favorites.includes(event.id));
    }
    return events.filter((event) => event.type === selectedType);
  };

  // Helper: Do two events overlap in time?
  const eventsOverlap = (a, b) => new Date(a.start) < new Date(b.end) && new Date(a.end) > new Date(b.start);

  // Helper: A session with nothing running in parallel (keynotes, breaks, the
  // single-track morning programme) spans the full timeline width
  const isFullWidthEvent = (event, allEvents) =>
    !allEvents.some((other) => other.id !== event.id && eventsOverlap(event, other));

  // Helper: Group events into chronological rows aligned by start time
  const buildTimeline = (events, roomOrder, fullWidthIds) => {
    const sorted = [...events].sort(
      (a, b) =>
        new Date(a.start) - new Date(b.start) ||
        Number(fullWidthIds.has(b.id)) - Number(fullWidthIds.has(a.id)) ||
        roomOrder.indexOf(a.room) - roomOrder.indexOf(b.room)
    );

    const rows = [];
    sorted.forEach((event) => {
      const last = rows[rows.length - 1];
      if (fullWidthIds.has(event.id)) {
        rows.push({ kind: 'full', start: event.start, events: [event] });
      } else if (last && last.kind === 'parallel' && last.start === event.start) {
        last.events.push(event);
      } else {
        rows.push({ kind: 'parallel', start: event.start, events: [event] });
      }
    });
    return rows;
  };

  // Helper: Find speaker profile picture
  const findSpeakerProfile = (speakerId) => {
    const speaker = speakerData.find((s) => s.id === speakerId);
    return speaker ? speaker.profilePicture : null;
  };

  // Helper: Filter events by selected day
  const filterEventsByDay = (events, day) => {
    const gridDay = getDateForSelectedDay();
    if (!gridDay) return [];
    const gridDate = new Date(gridDay.date).toDateString();
    return events.filter((event) => {
      const eventDate = new Date(event.start).toDateString();
      return eventDate === gridDate;
    });
  };

  // Helper: Room column order. Sessionize's grid order is kept, except that rooms
  // sharing a base name ("Mission 1", "Mission 2") are sorted naturally so numbered
  // rooms always appear in numeric order.
  const roomBaseName = (room) => room.trim().replace(/\s*\d+$/, '');
  const orderRooms = (roomList) => {
    const firstIndexByBase = {};
    roomList.forEach((room, index) => {
      const base = roomBaseName(room);
      if (!(base in firstIndexByBase)) {
        firstIndexByBase[base] = index;
      }
    });
    return [...roomList].sort(
      (a, b) =>
        firstIndexByBase[roomBaseName(a)] - firstIndexByBase[roomBaseName(b)] ||
        a.localeCompare(b, undefined, { numeric: true })
    );
  };

  // Helper: Get rooms for selected day from gridData
  const getRoomsForSelectedDay = () => {
    const gridDay = getDateForSelectedDay();
    if (!gridDay) return [];
    return orderRooms(gridDay.rooms.map((room) => room.name));
  };

  // Helper: Is event live?
  const isLive = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    return currentTime >= startTime && currentTime <= endTime;
  };

  // Helper: Toggle favorite
  const toggleFavorite = (eventId) => {
    setFavorites((prev) => {
      if (prev.includes(eventId)) {
        return prev.filter((id) => id !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  };

  // Helper: Calculate remaining minutes
  const calculateRemainingMinutes = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end - now;
    return Math.max(0, Math.ceil(diff / (1000 * 60)));
  };

  // Modal component (unverändert)
  const Modal = ({ isOpen, event, favorites, toggleFavorite, findSpeakerProfile, onClose }) => {
    if (!isOpen || !event) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>

          <div className="event-modal">
            <h2>{event.title}</h2>
            {event.isServiceSession ? (
              <p className="confirmed-session-label">
                <strong>Service Session</strong>
              </p>
            ) : (
              <p className="confirmed-session-label">
                <strong>Confirmed Session</strong>
              </p>
            )}

            <div className="modal-main-content">
              <div className="description-section">
                <h3>Description</h3>
                <div className="event-description" style={{ whiteSpace: 'pre-line' }}>
                  {event.description}
                </div>
              </div>

              <div className="info-speakers-section">
                <div className="session-info">
                  <h3>Session Info</h3>
                  <p>
                    <strong>Time</strong>
                    <br />
                    {event.time} - {event.endTime}
                  </p>
                  <p>
                    <strong>Room</strong>
                    <br />
                    {event.room}
                  </p>
                  {event.topics?.length > 0 && (
                    <p>
                      <strong>Topics</strong>
                      <br />
                      {event.topics.join(', ')}
                    </p>
                  )}
                  <p>
                    <strong>Session Type</strong>
                    <br />
                    {event.type === 'keynote' ? (
                      <span className="session-label session-label--keynote">Keynote</span>
                    ) : event.type === 'workshop' ? (
                      <span className="session-label session-label--workshop">Workshop</span>
                    ) : event.type === 'service' ? (
                      <span className="session-label session-label--service">Service Session</span>
                    ) : event.type === 'lightning' ? (
                      <span className="session-label session-label--lightning">Lightning Talk</span>
                    ) : event.type === 'talk' ? (
                      <span className="session-label session-label--talk">Talk</span>
                    ) : (
                      event.type.charAt(0).toUpperCase() + event.type.slice(1) + ' Session'
                    )}
                  </p>
                </div>

                <div className="speakers-section">
                  <h3>Speakers</h3>
                  {event.speakers?.map((speaker) => {
                    const speakerProfile = findSpeakerProfile(speaker.id);
                    return (
                      <div key={speaker.id} className="speaker-detail">
                        {speakerProfile && (
                          <img
                            src={speakerProfile}
                            alt={speaker.name}
                            className="speaker-avatar-large"
                          />
                        )}
                        <div>
                          <h4>{speaker.name}</h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <button
              className={`modal-favorite-button ${favorites.includes(event.id) ? 'favorited' : ''}`}
              aria-label={
                favorites.includes(event.id) ? 'Remove from favorites' : 'Add to favorites'
              }
              title={favorites.includes(event.id) ? 'Remove from favorites' : 'Add to favorites'}
              onClick={() => toggleFavorite(event.id)}
            >
              <svg
                className="schedule-card-favorite-icon"
                viewBox="0 0 24 24"
                fill={favorites.includes(event.id) ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    event: PropTypes.object,
    favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    findSpeakerProfile: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [speakersResponse, eventsResponse, sessionsResponse] = await Promise.all([
          fetch(speakerURL),
          fetch(scriptUrl),
          // Topics are decoration only — never fail the schedule over them
          fetch(sessionsUrl).catch(() => null),
        ]);

        const speakersData = await speakersResponse.json();
        const eventsData = await eventsResponse.json();

        let topicsMap = {};
        try {
          const sessionsData = sessionsResponse ? await sessionsResponse.json() : [];
          sessionsData.forEach((group) => {
            (group.sessions || []).forEach((session) => {
              const topics = (session.categories || [])
                .filter((category) => category.name === 'Topics')
                .flatMap((category) => (category.categoryItems || []).map((item) => item.name));
              if (topics.length) {
                topicsMap[session.id] = topics;
              }
            });
          });
        } catch {
          topicsMap = {};
        }
        setTopicsById(topicsMap);

        setSpeakerData(speakersData);
        // Optionally limit to a single conference day (workshops page vs. conference page)
        const grid = dayIndex === null ? eventsData : eventsData.slice(dayIndex, dayIndex + 1);
        setGridData(grid); // Save raw grid data
        setEvents(convertSessionsToEvents(grid, sessionFilters, topicsMap));
        // Default day tab: the event day matching today's local date (29 Oct shows
        // the workshops, 30 Oct the conference talks); before the event the first
        // day, after it the last day. Calendar-date strings avoid timezone drift.
        const todayKey = new Date().toLocaleDateString('en-CA');
        const dayKeys = grid.map((day) => day.date.slice(0, 10));
        let defaultDay = dayKeys.indexOf(todayKey);
        if (defaultDay < 0) {
          defaultDay = todayKey > dayKeys[dayKeys.length - 1] ? grid.length - 1 : 0;
        }
        setSelectedDay(defaultDay);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  // NEU: Events neu berechnen, wenn Filter geändert werden
  useEffect(() => {
    if (gridData.length) {
      setEvents(convertSessionsToEvents(gridData, sessionFilters, topicsById));
    }
    // eslint-disable-next-line
  }, [sessionFilters, gridData, topicsById]);

  // Update rooms when selectedDay or gridData changes
  useEffect(() => {
    setRooms(getRoomsForSelectedDay());
    // eslint-disable-next-line
  }, [selectedDay, gridData]);

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch { }
  }, [favorites]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (hasError || gridData.length === 0) {
    return (
      <div className="schedule-container">
        <p className="schedule-empty-message">
          The full schedule is not published yet — check back soon. In the meantime, you can find
          more details on{' '}
          <a
            href="https://sessionize.com/dutch-cloud-native-day-2026/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sessionize
          </a>
          .
        </p>
      </div>
    );
  }

  // Filter events for selected day and type. Full-width rows are determined against
  // the whole day, so changing the type filter never reshuffles the column layout.
  const dayEvents = filterEventsByDay(events, selectedDay);
  const filteredEvents = filterEvents(dayEvents);
  // Filter pills reflect only the session types present on the selected day.
  // Service sessions (breaks, sponsor intros) are shown in the grid but are not
  // worth filtering by.
  const sessionTypes = Array.from(new Set(dayEvents.map((event) => event.type))).filter(
    (type) => type !== 'service'
  );
  const fullWidthIds = new Set(
    dayEvents.filter((event) => isFullWidthEvent(event, dayEvents)).map((event) => event.id)
  );
  const parallelRooms = rooms.filter((room) =>
    dayEvents.some((event) => event.room === room && !fullWidthIds.has(event.id))
  );
  const timelineRows = buildTimeline(filteredEvents, parallelRooms, fullWidthIds);

  const renderEventCard = (event) => {
    const isFavorite = favorites.includes(event.id);
    const isLiveEvent = isLive(event.start, event.end);
    const remainingMinutes = isLiveEvent ? calculateRemainingMinutes(event.end) : 0;

    return (
      <ScheduleCard
        key={event.id}
        startTime={event.time}
        endTime={event.endTime}
        duration={`${event.duration} min`}
        title={event.title}
        speakers={event.speakers?.map((speaker) => ({
          name: speaker.name,
          avatar: findSpeakerProfile(speaker.id),
        }))}
        location={event.room}
        type={event.type}
        topics={event.topics}
        isFavorite={isFavorite}
        remainingMinutes={remainingMinutes}
        isLive={isLiveEvent}
        onFavoriteClick={() => toggleFavorite(event.id)}
        onClick={() => setSelectedEvent(event)}
      />
    );
  };

  return (
    <div className="schedule-container">
      {/* --- Header: Tage nebeneinander, Filter daneben --- */}
      <div className="schedule-header-row">
        {gridData.length > 1 && (
          <div className="schedule-day-tabs">
            {gridData.map((day, index) => (
              <button
                key={day.date}
                type="button"
                className={`schedule-day-btn ${selectedDay === index ? 'active' : ''}`}
                onClick={() => {
                  setSelectedDay(index);
                  setSelectedType('all');
                }}
              >
                {new Date(day.date).toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                })}
              </button>
            ))}
          </div>
        )}
        <div className="schedule-filter-pills">
          <button
            className={`schedule-filter-pill ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedType('all')}
          >
            All Sessions
          </button>
          {sessionTypes.map((type) => (
            <button
              key={type}
              className={`schedule-filter-pill ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              {typeLabels[type] || type.charAt(0).toUpperCase() + type.slice(1) + 's'}
            </button>
          ))}
          <div className="filter-divider"></div>
          <button
            className={`schedule-filter-pill ${selectedType === 'favorites' ? 'active' : ''}`}
            onClick={() => setSelectedType('favorites')}
          >
            Favorites
          </button>
        </div>
      </div>

      <div className="schedule-timeline">
        {parallelRooms.length > 1 && (
          <div
            className="timeline-room-headers"
            style={{ gridTemplateColumns: `repeat(${parallelRooms.length}, 1fr)` }}
          >
            {parallelRooms.map((room) => (
              <div key={room} className="room-header">
                <h2>{room}</h2>
              </div>
            ))}
          </div>
        )}

        {timelineRows.map((row) =>
          row.kind === 'full' ? (
            <div key={`${row.start}-full`} className="timeline-row timeline-row--full">
              {row.events.map(renderEventCard)}
            </div>
          ) : (
            <div
              key={row.start}
              className="timeline-row timeline-row--parallel"
              style={{ gridTemplateColumns: `repeat(${parallelRooms.length}, 1fr)` }}
            >
              {parallelRooms.map((room) => (
                <div key={room} className="timeline-cell">
                  {row.events.filter((event) => event.room === room).map(renderEventCard)}
                </div>
              ))}
            </div>
          )
        )}
      </div>

      <Modal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        findSpeakerProfile={findSpeakerProfile}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

Schedule.propTypes = {
  dayIndex: PropTypes.number,
};

export default Schedule;
