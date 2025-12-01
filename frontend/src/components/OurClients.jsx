import React from "react";

const dummyLogos = ["/morgan.png", "/uber.png", "/hcl.png", "/amazon.png"];

function OurClients() {
  return (
    <section className="py-8 ">
      <h2 className="text-center text-white text-2xl font-semibold mb-6">
        Our Clients
      </h2>
      <div className="w-full">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {dummyLogos.map((logo, index) => (
            <div
              key={index}
              className="bg-[#111] p-2 md:p-4 rounded-lg border border-white/10 hover:border-[#0066FF]/50"
            >
              <img
                src={logo}
                alt={`Client logo ${index + 1}`}
                className="h-12 md:h-16 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurClients;
