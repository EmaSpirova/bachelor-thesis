export class PlannerDto{
    name: string;
    description: string;
    locationList: any[];

    constructor(){
        this.name = '';
        this.description = '';
        this.locationList = [];
    }
}