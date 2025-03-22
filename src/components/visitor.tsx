"use client"
import { useEffect } from 'react';

const VisitorTracker = () => {
  useEffect(() => {
    // Function to retrieve or generate a unique visitor ID
    const getVisitorId = () => {
      let visitorId = localStorage.getItem('visitorId');
      if (!visitorId) {
        visitorId = `${(new Date()).getTime().toString()} ${Math.random().toString(6)}`;
        // console.log('Generated new visitor ID:', visitorId);
        localStorage.setItem('visitorId', visitorId);
      }
      return visitorId;
    };

    const visitorId = getVisitorId();

    // Build the data object to be sent
    const visitData = {
      visitorId,
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };

    // Call the endpoint with a POST request
    fetch(`/api/analytics/track`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitData),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Visit tracked successfully:', data);
        return !!data
      })
      .catch((error) => {
        console.error('Error tracking visit:', error);
      });
  }, []);

  return null; // This component doesn't render anything visible
};

export default VisitorTracker;
