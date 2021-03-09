class FormElement {
    _inputField = null
    _placeToRender = null
    _type = ''
    _id = ''
    _label = ''
    _placeholder = ''
    _required = true
    _pattern = null

    constructor(placeToRender, id, label, required) {
        this._placeToRender = placeToRender
        this._id = id
        this._label = label
        this._required = required == false ? false : true
    }

    _render() {
        const fieldBox = document.createElement('div')
        fieldBox.setAttribute('class', 'contact-form-box')
        this._placeToRender.appendChild(fieldBox)

        const fieldLabel = document.createElement('label')
        fieldLabel.for = this._id
        fieldLabel.innerHTML =
            `${this._label}: ${this._required ? "<span style='color: red'>*</span>" : ""} `

        fieldBox.appendChild(fieldLabel)

        this._inputField = document.createElement("input")
        this._inputField.type = this._type
        this._inputField.id = this._id
        this._inputField.placeholder = this._placeholder
        this._inputField.required = this._required

        if (this._pattern) {
            this._inputField.pattern = this._pattern
        }

        fieldLabel.appendChild(this._inputField)

    }
}

class NameFormElement extends FormElement {

    constructor(placeToRender, id, label, required) {
        super(placeToRender, id, label, required)

        this._placeholder = 'ФИО'
        this._type = 'text'
        this._pattern = '^[A-zА-яЁё]+$'

        this._render()
    }
}

class EmailFormElement extends FormElement {

    constructor(placeToRender, id, label, required) {
        super(placeToRender, id, label, required)

        this._placeholder = 'my_email@domain.com'
        this._type = 'email'
        this._pattern = "^[A-z0-9._-]+@[A-z0-9-]+[A-z0-9-.]+$"

        this._render()
    }
}

class PhoneFormElement extends FormElement {

    constructor(placeToRender, id, label, required) {
        super(placeToRender, id, label, required)

        this._placeholder = '+7(495)123-45-67'
        this._type = 'tel'
        this._pattern = "^\\+[0-9]\\(?[0-9]{3}\\)?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$"

        this._render()
    }
}

class TextAreaFormElement extends FormElement {
    constructor(placeToRender, id, label, required) {
        super(placeToRender, id, label, required)

        this._type = 'textarea'
        this._render()
    }
}

class ContactForm {

    constructor() {
        this._render()
    }

    _render() {
        const placeToRender = document.querySelector('.contact-form-section')

        if (placeToRender) {
            const contactForm = document.createElement('form')
            contactForm.setAttribute('class', 'contact-form')
            contactForm.setAttribute("method", "post");
            placeToRender.appendChild(contactForm)

            new NameFormElement(
                contactForm, 'contact-name', 'Представьтесь, пожалуйста')

            new EmailFormElement(
                contactForm, 'contact-email', 'Email')

            new PhoneFormElement(
                contactForm, 'contact-phone', 'Телефон')

            new TextAreaFormElement(
                contactForm, 'contact-message', 'Сообщение', false)


            const btns = document.createElement('div')
            btns.setAttribute('class', 'contact-form-btns')
            contactForm.appendChild(btns)

            const btnSubmit = document.createElement('button')
            btnSubmit.setAttribute('class', 'contact-submit-btn')
            btnSubmit.setAttribute('type', 'submit')
            btnSubmit.innerHTML = 'Отправить'
            btns.appendChild(btnSubmit)

            const info = document.createElement('div')
            info.setAttribute('class', 'contact-form-info')
            info.innerHTML = '<small>Поля со звездочкой <span style="color: red">*</span> обязательны к заполнению.</small>'
            contactForm.appendChild(info)
        }
    }

}

new ContactForm()
