"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Statistics = () => {
  const [pizzasSold, setPizzasSold] = useState(0);
  const [pizzasCreated, setPizzasCreated] = useState(0);
  const [reviewsLeft, setReviewsLeft] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.7,
  });

  React.useEffect(() => {
    if (inView) {
      const pizzasSoldTarget = 500;
      const pizzasCreatedTarget = 20;
      const reviewsLeftTarget = 10;

      let startTime = Date.now();

      const animateNumbers = () => {
        const elapsedTime = Date.now() - startTime;
        const duration = 4000;

        if (elapsedTime < duration) {
          const progress = elapsedTime / duration;

          setPizzasSold(Math.floor(pizzasSoldTarget * progress));
          setPizzasCreated(Math.floor(pizzasCreatedTarget * progress));
          setReviewsLeft(Math.floor(reviewsLeftTarget * progress));

          requestAnimationFrame(animateNumbers);
        } else {
          setPizzasSold(pizzasSoldTarget);
          setPizzasCreated(pizzasCreatedTarget);
          setReviewsLeft(reviewsLeftTarget);
        }
      };

      animateNumbers();
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      className="flex flex-col justify-center items-center my-20"
    >
      <h2 className="text-6xl font-extrabold text-oliveGreen mb-10">
        Every Slice Counts: Pizza Stats
      </h2>
      <div className="mt-10 flex gap-20 text-2xl text-oliveGreen">
        <div className="flex flex-col justify-center items-center gap-5 bg-lightGreen p-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <span className="text-xl font-medium">Pizzas Served Daily</span>
          <motion.span
            className="text-6xl font-bold text-tomatoRed"
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            +{pizzasSold}
          </motion.span>
          <span className="text-sm">Pizzas ordered every day!</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 bg-lightGreen p-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <span className="text-xl font-medium">
            Pizzas Created by Our Users
          </span>
          <motion.span
            className="text-6xl font-bold text-tomatoRed"
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            +{pizzasCreated}
          </motion.span>
          <span className="text-sm">Pizzas made and customized daily!</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 bg-lightGreen p-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <span className="text-xl font-medium">Customer Reviews Shared</span>
          <motion.span
            className="text-6xl font-bold text-tomatoRed"
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            +{reviewsLeft}
          </motion.span>
          <span className="text-sm">Reviews and feedback received daily!</span>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
