class FormField extends HTMLInputElement {
    _label = ''
    // _placeToRender = null

    constructor(type, klass, id, label, placeholder, required) {
        super()

        this.class = klass
        this.type = type
        this.id = id
        // this.setAttribute("placeholder", placeholder)
        // this.setAttribute("required", required || true)

        this._label = label

        // this.render()
    }

    render(placeToRender) {

        const fieldBox = document.createElement('div')
        fieldBox.setAttribute('class', 'contact-form-box')
        placeToRender.appendChild(fieldBox)

        const fieldLabel = document.createElement('label');
        fieldLabel.for = this.id;
        fieldLabel.innerHTML = `${this._label}: <span style='color: red'>*</span> `;
        fieldBox.appendChild(fieldLabel);
        fieldBox.appendChild(this)
    }
}


class ContactForm {

    _name = ''
    _phone = ''
    _email = ''
    _message = ''

    constructor() {

    }

    validate() {

    }


    render() {
        const placeToRender = document.querySelector('.contact-form-section')

        console.log(placeToRender)

        if (placeToRender) {
            const contactForm = document.createElement('form')
            contactForm.setAttribute('class', 'contact-form')
            contactForm.setAttribute("method", "post");
            // contactForm.setAttribute("action", "#"); 
            placeToRender.appendChild(contactForm)

            const field = new FormField({
                placeToRender: placeToRender,
                type: 'text',
                id: 'contact-name',
                label: 'Представьтесь, пожалуйста',
                placeholder: 'ФИО'
            })
            console.log(field)

            // const nameField = document.createElement("input");
            // inputField.setAttribute("type", type);
            // inputField.setAttribute("id", id);
            // inputField.setAttribute("placeholder", placeholder);
            // inputField.maxLength = 5000;
            // inputField.cols = 80;
            // inputField.rows = 3;
            // this._renderField(contactForm,
            //     'text', 'contact-name', 'Представьтесь, пожалуйста', 'ФИО', true)

            // this._renderField(contactForm,
            //     'email', 'contact-email', 'Email', 'email', true)

            // this._renderField(contactForm,
            //     'tel', 'contact-phone', 'Телефон', 'телефон', true)

            // const message = this._renderField(contactForm,
            //     'textarea', 'contact-message', 'Сообщение', '', false)

            console.log(message)

        }
    }

}

const form = new ContactForm()
form.render()