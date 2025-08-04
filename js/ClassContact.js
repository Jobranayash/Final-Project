'use strict';
export class Contact {
    #name;
    #phone; 
    #address;
    #image;
    #tag;
    constructor(name, phone, address, image,tag) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.image = image;
        this.tag = tag || ''; 
    }
    // Getters and Setters for properties

    // Tag
    get tag() {
        return this._tag;
    }
    set tag(value) {
        this._tag = value;
    }
    
    // Name
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    // Phone
    get phone() {
        return this._phone;
    }

    set phone(value) {
        this._phone = value;
    }

    // Address
    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    // Image
    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

}
