import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class PayPalButtonPlugin extends LitElement {

  // Define properties for client ID and the transaction amount
  static properties = {
    clientId: { type: String },
    amount: { type: String },
  };

  // Return metadata configuration for the plugin
  static getMetaConfig() {
    return {
      controlName: 'PayPal Button',
      fallbackDisableSubmit: false,
      version: '1.0',
      properties: {
        clientId: {
          type: 'string',
          title: 'Client ID',
          description: 'PayPal Client ID',
        },
        amount: {
          type: 'string',
          title: 'Amount',
          description: 'Transaction Amount',
        },
      },
    };
  }

  // Initialize default property values
  constructor() {
    super();
    this.clientId = '';
    this.amount = '0.01';  // Default value
  }

  // Render the component template
  render() {
    return html`
      <div id="paypal-button-container"></div>
    `;
  }

  // Append the PayPal script to the document's head
  connectedCallback() {
    super.connectedCallback();

    if (this.clientId) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${this.clientId}`;
      script.async = true;
      document.head.appendChild(script);

      const configScript = document.createElement('script');
      configScript.innerHTML = `
        paypal.Buttons({
          createOrder: function(data, actions) {
            // This function sets up the details of the transaction
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: '${this.amount}'  // Use the configured amount
                }
              }]
            });
          },
          onApprove: function(data, actions) {
            // This function captures the funds from the transaction
            return actions.order.capture().then(function(details) {
              // This function shows a transaction success message to your buyer
              alert('Transaction completed by ' + details.payer.name.given_name);
            });
          },
          onCancel: function(data) {
            // This function runs when the buyer cancels the payment
            alert('Payment cancelled');
          },
          onError: function(err) {
            // This function runs when an error occurs during payment processing
            console.error('Payment Error:', err);
          }
        }).render('#paypal-button-container');
      `;
      document.head.appendChild(configScript);
    }
  }
}

const elementName = 'paypal-button-plugin';
customElements.define(elementName, PayPalButtonPlugin);
