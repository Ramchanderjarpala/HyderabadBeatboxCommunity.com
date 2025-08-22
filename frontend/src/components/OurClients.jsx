import React from "react";

const dummyLogos = [
  "/morgan.png",
  "/uber.png",
  "/hcl.png",
  "/amazon.png",
  "/morgan.png",
  "/uber.png",
  "/hcl.png",
  "/amazon.png",
  "/morgan.png",
  "/uber.png",
  "/hcl.png",
  "/amazon.png",
  "/morgan.png",
  "/uber.png",
  "/hcl.png",
  "/amazon.png",
  "/morgan.png",
  "/uber.png",
  "/hcl.png",
  "/amazon.png",
  "/morgan.png",
  "/uber.png",
  "/hcl.png",
  "/amazon.png",
  "/morgan.png",
  "/uber.png",
  "/hcl.png",
  "/amazon.png",
  "/morgan.png",
  "/uber.png",
  "/hcl.png",
  "/amazon.png",
  "/morgan.png",
  "/uber.png",
  "/hcl.png",
  "/amazon.png",
  "/morgan.png",
  "/uber.png",
  "/hcl.png",
  "/amazon.png",
  "/morgan.png",
  "/uber.png",
  "/hcl.png",
  "/amazon.png",
  "/morgan.png",
  "/uber.png",
  "/hcl.png",
  "/amazon.png",
  "/morgan.png",
  "/uber.png",
  "/hcl.png",
  "/amazon.png",
  "/morgan.png",
  "/uber.png",
  "/hcl.png",
  "/amazon.png",
  "/morgan.png",
  "/uber.png",
  "/hcl.png",
  "/amazon.png",
  "/morgan.png",
  "/uber.png",
  "/hcl.png",
  "/amazon.png",
];

function OurClients() {
  return (
    <section className="py-8">
      <h2 className="text-center text-white text-2xl font-semibold mb-6">
        Our Clients
      </h2>
      <div className="overflow-hidden w-full">
        <div className="flex animate-scroll-banner">
          {[...dummyLogos, ...dummyLogos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              className="h-16 object-contain flex-shrink-0"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurClients;
