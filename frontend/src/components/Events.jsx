import React, { useState, useEffect } from "react";
import { Calendar, Users, Clock, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Section from "./Section";

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 md:flex md:space-x-4 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-[#0066FF]/10 rounded-lg flex items-center justify-center mb-2">
            <span className="text-xl md:text-2xl font-bold text-[#0066FF]">
              {value}
            </span>
          </div>
          <span className="text-[10px] md:text-xs uppercase text-white/60">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}

function EventModal({ event, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl rounded-2xl bg-[#111] p-6 md:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white/60 hover:text-white p-2"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Event Image as main theme */}
            {event.image && (
              <img
                src={event.image}
                alt="Event"
                className="w-full h-64 object-cover rounded mb-6"
              />
            )}

            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex justify-center md:block">
                <Calendar className="w-12 h-12 text-[#0066FF] flex-shrink-0" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {event.title}
                </h3>
                <div className="flex items-center text-[#0066FF] mb-6">
                  <Clock className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-sm md:text-base">{event.date}</span>
                </div>
                <div className="space-y-4">
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    {event.description}
                  </p>
                  {event.details && event.details.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-[#0066FF] text-sm md:text-base">
                        Event Details:
                      </h4>
                      <ul className="list-disc list-inside text-white/80 space-y-2 text-sm md:text-base">
                        {event.details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {event.location && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-[#0066FF] mb-2 text-sm md:text-base">
                        Location:
                      </h4>
                      <p className="text-white/80 text-sm md:text-base">
                        {event.location}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import LoadingSpinner from "./LoadingSpinner";

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/events`
      );
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="events" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/home1.webp')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      <div className="container-width relative z-10">
        <h2 className="section-title text-center">Upcoming Events</h2>

        <div className="mb-16 text-center">
          <p className="text-[#0066FF] mb-4">NEXT EVENT</p>
          <CountdownTimer targetDate="2025-03-23T16:00:00" />
        </div>

        {loading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <motion.button
                key={event._id}
                className="bg-[#111] rounded-lg p-6 text-left hover:bg-[#222] transition-colors cursor-pointer border border-white/10 hover:border-[#0066FF]/50 w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedEvent(event)}
              >
                {event.image && (
                  <img
                    src={event.image}
                    alt="Event"
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold mb-2 text-center">
                  {event.title}
                </h3>
                <div className="flex items-center justify-center text-[#0066FF] text-sm mb-2">
                  <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{event.date}</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedEvent && (
            <EventModal
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}

export default Events;
