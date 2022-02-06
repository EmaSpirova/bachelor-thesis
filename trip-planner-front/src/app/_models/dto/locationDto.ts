import { Byte } from "@angular/compiler/src/util";

export class LocationDto {
    name: string;

    description: string;

    address: string;

    priority: string;

    duration: number;

    trivia: string;

    photo: Byte[];

    region: number;

    city: number;

    user: string;


    constructor() {
        this.name = '';
        this.description = '';
        this.address = '';
        this.priority = '';
        this.duration = 0;
        this.trivia = '';
        this.photo = [];
        this.city = 0;
        this.region = 0;
        this.user = '';
    }
}