import React from "react";

const dummyLogos = [
  "https://ik.imagekit.io/qci75z79t/BBx%20Home%20Pics/hcl.png",
  "https://ik.imagekit.io/qci75z79t/BBx%20Home%20Pics/uber.png",
  "https://ik.imagekit.io/qci75z79t/BBx%20Home%20Pics/morgan.png",
  "https://ik.imagekit.io/qci75z79t/BBx%20Home%20Pics/amazon.png", 
];

function OurClients() {
  return (
    <section className="py-8 ">
      <h2 className="text-center text-white text-2xl font-semibold mb-6">
        Collaborated
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
