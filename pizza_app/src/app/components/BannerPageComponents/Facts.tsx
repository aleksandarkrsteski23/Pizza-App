"use client";

import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const pizzaFacts = [
  {
    id: 1,
    header: "Pizza is a breakfast food",
    fact: "In some parts of the world, leftover pizza is a popular choice for breakfast. Because who doesn't love cold pizza with their morning coffee?",
  },
  {
    id: 2,
    header: "The world’s largest pizza",
    fact: "The largest pizza ever made was over 1261 square meters and was called 'The Ottavia.' It was made in Rome in 2012 and was gluten-free!",
  },
  {
    id: 3,
    header: "Pizza has a museum",
    fact: "There’s a museum dedicated entirely to pizza in Naples, Italy, called the 'Museo della Pizza.' Because pizza deserves its own museum, obviously.",
  },
  {
    id: 4,
    header: "Pizza was once illegal",
    fact: "In the 18th century, pizza was illegal in France because the king thought it was too plebeian for the nobles to eat. How rude!",
  },
  {
    id: 5,
    header: "There’s a National Pizza Day",
    fact: "Every year, on February 9th, pizza lovers across the U.S. celebrate National Pizza Day. It's basically an unofficial holiday that is always delicious.",
  },
  {
    id: 6,
    header: "Pizza is more popular than vegetables",
    fact: "According to a survey, 1 in 3 people would rather eat pizza every day than any other type of food. Guess vegetables are on the sidelines for now!",
  },
  {
    id: 7,
    header: "Pizza in space",
    fact: "Astronauts in space have enjoyed pizza! In 2001, Pizza Hut delivered the first pizza to space with the help of a special 'zero-gravity' pizza box.",
  },
  {
    id: 8,
    header: "Pineapple pizza controversy",
    fact: "Some people love pineapple on pizza, others think it's a crime against pizza, and a few simply can’t decide. The debate is never-ending!",
  },
  {
    id: 9,
    header: "Pizza can be a work of art",
    fact: "In Italy, there's a pizza artist who creates pizza portraits of famous figures like Leonardo da Vinci and Albert Einstein, using ingredients as his medium. Talk about 'topping' the competition!",
  },
  {
    id: 10,
    header: "Pizza as a love language",
    fact: "There’s a theory that says the way you fold your pizza slice can tell you about your personality. Are you a folder or a scruncher? Either way, you’re a pizza lover!",
  },
];

const Facts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % pizzaFacts.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pizzaFacts.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + pizzaFacts.length) % pizzaFacts.length
    );
  };

  return (
    <section className="w-full h-screen bg-[url('/images/SliderBanner.jpg')] bg-cover bg-center relative flex justify-center items-center flex-col gap-10">
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

      <h2 className="text-4xl font-bold text-center mb-4 z-10 relative text-goldenYellow  uppercase">
        Did you know that:
      </h2>

      <div className="bg-transparent/50 p-6 rounded-xl shadow-md z-10 relative text-center w-3/4 text-goldenYellow">
        <h3 className="text-2xl font-semibold uppercase">
          {pizzaFacts[currentIndex].header}
        </h3>
        <div>
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
            <button
              onClick={goToPrevious}
              className="bg-oliveGreen text-white p-3 rounded-full hover:bg-blue-400 transition"
            >
              <FaArrowLeft size={24} />
            </button>
          </div>
          <p className="text-lg mt-4 w-4/5 m-auto">
            {pizzaFacts[currentIndex].fact}
          </p>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
            <button
              onClick={goToNext}
              className="bg-oliveGreen text-white p-3 rounded-full hover:bg-blue-400 transition"
            >
              <FaArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facts;
