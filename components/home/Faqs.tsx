'use client';

import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const Faqs: React.FC = () => {
  const faqData: FAQItem[] = [
    {
      question: "What is Dehelp?",
      answer: "Dehelp is a decentralized platform that empowers Self Help Groups (SHGs) in India by leveraging blockchain technology, AI, and DeFi solutions to enhance financial inclusion and community development."
    },
    {
      question: "How does blockchain technology benefit Self Help Groups?",
      answer: "Blockchain provides transparency, security, and immutability of financial transactions. It helps SHGs maintain accurate records, reduce fraud, and create trust within the community by ensuring every transaction is traceable and verifiable."
    },
    {
      question: "Is the platform secure?",
      answer: "Yes, our platform uses advanced blockchain encryption and AI-powered security measures to protect user data and financial transactions. We prioritize the privacy and safety of our SHG members."
    },
    {
      question: "How can my Self Help Group join Dehelp?",
      answer: "You can register your SHG through our onboarding process. Our team will guide you through the verification and setup steps to integrate your group into the Dehelp ecosystem."
    },
    {
      question: "What financial services does Dehelp offer?",
      answer: "We provide micro-lending, investment tracking, group savings management, transparent fund allocation, and AI-driven financial insights tailored for Self Help Groups."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="hero-gradient py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text-white dark:gradient-text-dark">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg bg-white shadow-sm gradient-text-white dark:bg-gray-800 dark:border-gray-700"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
              >
                <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-blue-600 dark:text-blue-400" />
                ) : (
                  <ChevronDown className="text-gray-500 dark:text-gray-400" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out`}
                style={{
                  maxHeight: openIndex === index ? '500px' : '0',
                }}
              >
                <div className="p-4 pt-0 text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;