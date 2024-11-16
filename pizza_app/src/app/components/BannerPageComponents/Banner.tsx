import React from "react";

const Banner = () => {
  return (
    <section className="w-full h-screen bg-[url('/images/BannerImage.jpeg')] bg-cover bg-center">
      <div className="w-1/2 text-tomatoRed flex flex-col justify-center h-full mx-10">
        <h1 className="text-8xl font-bold mb-5">Welcome to PizzaHub</h1>
        <h3 className="text-4xl font-bold mb-10">
          Where Every Slice is a Masterpiece!
        </h3>
        <p className="text-xl font-bold w-3/5">
          Order, create, and enjoy your perfect pizza – your favorite flavors,
          your way!
        </p>
      </div>
    </section>
  );
};

export default Banner;
