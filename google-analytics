import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class GoogleAnalyticsPlugin extends LitElement {

  // Define properties for tracking ID and event name
  static properties = {
    trackingId: { type: String },
    eventName: { type: String },
  };

  // Return metadata configuration for the plugin
  static getMetaConfig() {
    return {
      controlName: 'Google Analytics',
      fallbackDisableSubmit: false,
      version: '1.0',
      properties: {
        trackingId: {
          type: 'string',
          title: 'Tracking ID',
          description: 'Google Analytics Tracking ID',
        },
        eventName: {
          type: 'string',
          title: 'Event Name',
          description: 'Name of the event to track',
        },
      },
    };
  }

  // Initialize default property values
  constructor() {
    super();
    this.trackingId = '';
    this.eventName = '';
  }
/*
  // Render the component template
  render() {
    return html`
      <button @click="${this.trackEvent}">Track Event</button>
    `;
  }
*/
  // Track the specified event when the button is clicked
  trackEvent() {
    if (this.trackingId && this.eventName) {
      gtag('event', this.eventName, {
        event_category: 'Form Interaction',
        event_label: 'Nintex Forms',
      });
    }
  }

  // Append the Google Analytics script to the document's head
  connectedCallback() {
    super.connectedCallback();

    if (this.trackingId) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.trackingId}`;
      script.async = true;
      document.head.appendChild(script);

      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${this.trackingId}');
      `;
      document.head.appendChild(configScript);
    }
  }
}

const elementName = 'google-analytics-plugin';
customElements.define(elementName, GoogleAnalyticsPlugin);
