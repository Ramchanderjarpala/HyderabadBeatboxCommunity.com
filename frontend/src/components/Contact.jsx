import React from "react";
import { MapPin, Mail } from "lucide-react";
import {
  RiDiscordLine,
  RiInstagramLine,
  RiWhatsappLine,
} from "@remixicon/react";
import { motion } from "framer-motion";
import Section from "./Section";

function Contact() {
  return (
    <Section id="contact" className="section-padding">
      <div className="container-width">
        <h2 className="section-title text-center">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div className="card p-8" whileHover={{ y: -10 }}>
            <h3 className="text-2xl font-semibold mb-8">Contact Info</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-white/80">
                  Hyderabad, Telangana, India
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                <a
                  href="mailto:bbxhydofficial@gmail.com"
                  className="text-white/80 hover:text-primary transition-colors"
                >
                  bbxhydofficial@gmail.com
                </a>
              </div>
              <a
                href="https://chat.whatsapp.com/DPog876RSEyFJOHhgB98Ty"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 hover:text-primary transition-colors"
              >
                <RiWhatsappLine className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-white/80">Join WhatsApp Group</span>
              </a>
            </div>
          </motion.div>

          <motion.div className="card p-8" whileHover={{ y: -10 }}>
            <h3 className="text-2xl font-semibold mb-8">Connect With Us</h3>
            <div className="space-y-6">
              <a
                href="https://www.instagram.com/bbxhyd_official/?igsh=MTNvazA2eGFvbXBwaA%3D%3D#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
              >
                <RiInstagramLine className="w-8 h-8 text-primary" />
                <span className="text-white/80">Follow us on Instagram</span>
              </a>
              <a
                href="https://discord.gg/AjQdtMJnrR"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
              >
                <RiDiscordLine className="w-8 h-8 text-primary" />
                <span className="text-white/80">Join our Discord server</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

export default Contact;
