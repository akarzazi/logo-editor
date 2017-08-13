class ColorPicker extends HTMLElement {

    // A getter/setter for an open property.
    get value() {
        return this.getAttribute('value');
    }

    set value(val) {
        // Reflect the value of the open property as an HTML attribute.
        this.setAttribute('value', val);
    }

    // A getter/setter for a disabled property.
    get disabled() {
        return this.hasAttribute('disabled');
    }

    set disabled(val) {
        // Reflect the value of the disabled property as an HTML attribute.
        if (val) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    // Can define constructor arguments if you wish.
    constructor() {
        // If you define a ctor, always call super() first!
        // This is specific to CE and required by the spec.
        super();


    }

    connectedCallback() {
        let input = document.createElement('input');
        input.type = "color"
        input.style.opacity = 0;
        input.value = this.value;
        this.style.backgroundColor = this.value;
        input.addEventListener('change', e => this.OnColorChanged(e));
        this.appendChild(input);
    }

    OnColorChanged(e) {
        this.value = e.target.value;
        this.style.backgroundColor = e.target.value;
    }
}

customElements.define('color-picker', ColorPicker);