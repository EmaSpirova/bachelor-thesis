
export class Location{
    
    id: number;
    name: string;
    description: string;
    address: string;
    priority: string;
    duration: number;
    photo: any[];

    constructor(){
        this.id = 1;
        this.name = 'Location name';
        this.description = 'Location description';
        this.address = 'Location addreess';
        this.priority = 'Location priority';
        this.duration = 1;
        this.photo = [];
    }
}