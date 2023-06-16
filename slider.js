import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class SliderPlugin extends LitElement {

  static styles = css`
    :host {
      display: block;
      width: 95%;
    }
  `;
  
  static properties = {
    min: { type: Number },
    max: { type: Number },
    value: { type: Number },
    displayValue: { type: Number },
  };
  
  static getMetaConfig() {
    return {
      controlName: 'Slider Plugin',
      fallbackDisableSubmit: false,
      version: '1.0',
      properties: {
        min: {
          type: 'number',
          title: 'Minimum',
          description: 'Minimum value of the slider'
        },
        max: {
          type: 'number',
          title: 'Maximum',
          description: 'Maximum value of the slider'
        },
        value: {
          type: 'number',
          title: 'Value',
          description: 'Current value of the slider',
          isValueField: true,
        },
      },
      events: ["ntx-value-change"],
    };
  }
  
  constructor() {
    super();
    this.min = 0;
    this.max = 100;
    this.value = 0;
    this.displayValue = 0;
  }

  render() {
    return html`
      <input
        type="range"
        .min=${this.min}
        .max=${this.max}
        .value=${this.displayValue}
        @input=${this.handleInput}
        @change=${this.handleChange}
      />
      <p>Value: ${this.displayValue}</p>
    `;
  }

  handleInput(event) {
    this.displayValue = event.target.value;
  }

  handleChange(event) {
    this.value = event.target.value;
    this.dispatchEvent(new CustomEvent('ntx-value-change', { detail: { value: this.value }, bubbles: true, composed: true }));
    this.setComponentValue(this.value);
  }

  setComponentValue(value) {
    if (window.NWF && window.NWF.FormFiller && window.NWF.FormFiller.Functions) {
      const runtime = window.NWF.FormFiller.Functions.getRuntime();
      if (runtime) {
        runtime.execute('setComponentValue', this, value);
      }
    }
  }
}

const elementName = 'slider-plugin';
customElements.define(elementName, SliderPlugin);
