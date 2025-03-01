"use client";

import { motion } from "framer-motion";
import {
  IconBrandGithub,
  IconWorld,
  IconMail,
  IconCode,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "REST APIs",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Git",
  "CI/CD"
];

const services = [
  {
    title: "Full Stack Development",
    description: "End-to-end web application development with modern technologies"
  },
  {
    title: "API Development",
    description: "Design and implementation of scalable REST APIs"
  },
  {
    title: "UI/UX Design",
    description: "Creating beautiful and intuitive user interfaces"
  },
  {
    title: "Cloud Architecture",
    description: "Scalable cloud solutions and infrastructure setup"
  }
];

export default function DeveloperPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-2xl font-bold">Developer</h1>
          <p className="text-gray-400">About the creator of Earnlyzer</p>
        </div>

        <div className="space-y-6">
          {/* Profile Card */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-400/10 to-purple-400/5 p-8 border border-white/5"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-3xl font-medium text-white mb-4">
                NA
              </div>
              <h2 className="text-2xl font-bold text-white">Naeem Anjum</h2>
              <p className="text-gray-400 mt-1">Full Stack Developer</p>
              <p className="text-gray-300 mt-4 max-w-2xl">
                Experienced web developer specializing in modern web applications. Passionate about creating efficient, 
                scalable solutions and delivering exceptional user experiences.
              </p>
              <p className="text-gray-400 mt-1">About the creator of Earnlyzer</p>
              <p className="text-gray-400 mt-1">Visit the Google AI Studio to get your API key. It&apos;s free to start!</p>
              
              {/* Social Links */}
              <div className="flex items-center gap-4 mt-6">
                <a
                  href="https://github.com/thisnaeem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <IconBrandGithub className="w-5 h-5 text-gray-400" />
                </a>
                <a
                  href="https://linkedin.com/in/thisnaeem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <IconBrandLinkedin className="w-5 h-5 text-gray-400" />
                </a>
                <a
                  href="https://twitter.com/thisnaeem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <IconBrandTwitter className="w-5 h-5 text-gray-400" />
                </a>
                <a
                  href="https://naeemanjum.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <IconWorld className="w-5 h-5 text-gray-400" />
                </a>
                <a
                  href="mailto:me@naeemanjum.com"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <IconMail className="w-5 h-5 text-gray-400" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-gray-800/50 border border-white/5 p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-gray-900/50 border border-white/10 text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-gray-800/50 border border-white/5 p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gray-900/50 border border-white/10"
                >
                  <h3 className="font-medium text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-400">{service.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
            className="rounded-2xl bg-gradient-to-b from-emerald-400/10 to-emerald-400/5 p-6 border border-white/5 text-center"
          >
            <h2 className="text-xl font-semibold text-white mb-2">Let&apos;s Work Together</h2>
            <p className="text-gray-400 mb-4">Have a project in mind? Get in touch to discuss how I can help.</p>
            <a
              href="mailto:me@naeemanjum.com"
              className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              <IconMail className="w-4 h-4" />
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
