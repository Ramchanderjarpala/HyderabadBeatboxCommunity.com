import React from "react";
import { MapPin, Mail } from "lucide-react";

import {
  RiDiscordLine,
  RiInstagramLine,
  RiWhatsappLine,
} from "@remixicon/react";
import { motion } from "framer-motion";
import Section from "./Section";
import ReactTypingEffect from "react-typing-effect";

function Contact() {
  return (
    <footer
      id="contact"
      className=" text-white flex flex-col items-center py-4"
    >
      <div className="px-4 flex flex-col items-center">
        <img src="/hbx3.png" alt="BBX Icon" className="w-40 h-40 " />
        <div className="flex space-x-6 -mt-10 mr-2  mb-2">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <RiInstagramLine className="w-6 h-6" />
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <RiWhatsappLine className="w-6 h-6" />
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <RiDiscordLine className="w-6 h-6" />
          </a>
        </div>
      </div>
      <p className="mb-1 text-white/50 text-xs">
        {`© ${new Date().getFullYear()} Hyderabad Beatbox Community. All rights
        reserved.`}
      </p>
      <div className="text-center text-white/40 text-[10px]">
        <ReactTypingEffect
          text={["Developed by X Boy"]}
          speed={100}
          eraseDelay={2000}
          typingDelay={1000}
          cursorRenderer={(cursor) => <span>{cursor}</span>}
        />
      </div>
    </footer>
  );
}

export default Contact;
