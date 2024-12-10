"use client";

import { useEffect } from 'react';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function ClientTour() {
  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '.api-key-section',
          popover: {
            title: 'API Key Setup',
            description: 'First, add your API key to start using the keyword research tools',
            side: "bottom",
            align: 'start'
          }
        },
        {
          element: '.keyword-tool-section',
          popover: {
            title: 'Keyword Research',
            description: 'Use our keyword research tool to find profitable content ideas',
            side: "bottom",
            align: 'start'
          }
        },
        {
          element: '.feedback-section',
          popover: {
            title: 'Feedback',
            description: 'Have suggestions? We\'d love to hear your feedback!',
            side: "left",
            align: 'start'
          }
        }
      ],
      nextBtnText: 'Next',
      prevBtnText: 'Previous',
      doneBtnText: 'Done',
      onDestroyed: () => {
        localStorage.setItem('hasSeenTour', 'true');
      }
    });

    const startTour = () => {
      const hasSeenTour = localStorage.getItem('hasSeenTour');
      if (!hasSeenTour) {
        driverObj.drive();
      }
    };

    window.addEventListener('START_TOUR', startTour);
    return () => window.removeEventListener('START_TOUR', startTour);
  }, []);

  return null;
} 