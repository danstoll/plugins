import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class GallerySliderPlugin extends LitElement {

  static styles = css`
    input[type="range"] {
      width: 100%;
      height: var(--slider-height, 15px);
      background: var(--slider-background, #d3d3d3);
      outline: none;
      opacity: 0.7;
      transition: opacity .2s;
    }
    input[type="range"]::-webkit-slider-thumb {
      width: var(--slider-thumb-width, 25px);
      height: var(--slider-thumb-height, 25px);
      background: var(--slider-thumb-background, #4CAF50);
      cursor: pointer;
      appearance: none;
    }
  `;
  
  static properties = {
    min: { type: Number },
    max: { type: Number },
    value: { type: Number },
    displayValue: { type: Number },
    formVariable: { type: String },
    defaultValue: { type: Number },
    sliderWidth: { type: String },
    sliderHeight: { type: String },
    sliderBackground: { type: String },
    sliderThumbWidth: { type: String },
    sliderThumbHeight: { type: String },
    sliderThumbBackground: { type: String },
  };
  
  static getMetaConfig() {
    return {
        controlName: 'Slider Plugin',
        version: '1',
        fallbackDisableSubmit: false,
        pluginAuthor: 'Dan Stoll',
        pluginVersion: '1.0.0',
        description: 'A custom slider plugin for Nintex Forms',
        iconUrl: 'https://gallery.nintex.com/assets/images/Nintex%20Nav%20Logo.png',
        groupName: 'Nintex Gallery',
        searchTerms: ['slider', 'range', 'input'],
        designer: {
          canvasRestrictions: {
            minSize: 6,
            isFullRow: false
          }
        },
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
        formVariable: {
          type: 'string',
          title: 'Form Variable',
          description: 'The form variable to store the value to'
        },
        defaultValue: {
          type: 'number',
          title: 'Default Value',
          description: 'The default value of the slider'
        },
        sliderWidth: {
          type: 'string',
          title: 'Slider Width',
          description: 'The width of the slider'
        },
        sliderHeight: {
          type: 'string',
          title: 'Slider Height',
          description: 'The height of the slider'
        },
        sliderBackground: {
          type: 'color',
          title: 'Slider Background',
          description: 'The background color of the slider'
        },
        sliderThumbWidth: {
          type: 'string',
          title: 'Slider Thumb Width',
          description: 'The width of the slider thumb'
        },
        sliderThumbHeight: {
          type: 'string',
          title: 'Slider Thumb Height',
          description: 'The height of the slider thumb'
        },
        sliderThumbBackground: {
          type: 'color',
          title: 'Slider Thumb Background',
          description: 'The background color of the slider thumb'
        },
      },
      events: ["ntx-value-change"],
    };
  }
  constructor() {
    super();
    this.setAttribute('role', 'slider');
    this.setAttribute('aria-label', 'Slider');
    this.min = 0;
    this.max = 100;
    this.value = 0;
    this.displayValue = 0;
    this.formVariable = '';
    this.defaultValue = 0;
    this.sliderWidth = '';
    this.sliderHeight = '';
    this.sliderBackground = '';
    this.sliderThumbWidth = '';
    this.sliderThumbHeight = '';
    this.sliderThumbBackground = '';
}

render() {
    return html`
        <label id="sliderLabel" for="slider">Slider:</label>
        <input
            id="slider"
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
    this.setFormVariableValue(this.value);
}

setFormVariableValue(value) {
    if (window.NWF && window.NWF.FormFiller && window.NWF.FormFiller.Functions) {
        const runtime = window.NWF.FormFiller.Functions.getRuntime();
        if (runtime) {
            runtime.execute('setVariableValue', this.formVariable, value);
        }
    }
}

}

customElements.define('gallery-slider-plugin', GallerySliderPlugin);
