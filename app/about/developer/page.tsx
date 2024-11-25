'use client';

import { IconBrandGithub, IconWorld, IconMail, IconCode } from '@tabler/icons-react';
import { PageHeader } from '@/app/components/PageHeader';

export default function DeveloperPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader title="Developer Credits" />
      
      <div className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-lg">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
            <IconCode className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Naeem Anjum</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Full Stack Web Developer
          </p>
        </div>

        <div className="space-y-6">
          <p className="text-lg text-center max-w-2xl mx-auto">
            Experienced web developer offering professional web development services. 
            Specialized in creating modern, responsive, and user-friendly applications.
          </p>

          <div className="flex justify-center gap-4 mt-8">
            <a
              href="https://naeemanjum.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <IconWorld className="w-5 h-5" />
              Visit Website
            </a>
            <a
              href="mailto:me@naeemanjum.com"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <IconMail className="w-5 h-5" />
              Contact
            </a>
            <a
              href="https://github.com/thisnaeem"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <IconBrandGithub className="w-5 h-5" />
              GitHub
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-center">Services Offered</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Full Stack Development',
                'React/Next.js Applications',
                'API Development',
                'UI/UX Design',
                'Web Performance Optimization',
                'Technical Consulting'
              ].map((service, index) => (
                <div 
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 