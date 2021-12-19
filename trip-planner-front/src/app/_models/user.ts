export class User{

    id: number;
    username: string;
    fullName: string;
    password: string;
    confirmPassword: string;
    create_At: Date;
    update_At:Date;

    constructor(){
        this.id = 1;
        this.username = '';
        this.fullName = '';
        this.password = '';
        this.confirmPassword = '';
        this.create_At = new Date();
        this.update_At = new Date();
    }
}