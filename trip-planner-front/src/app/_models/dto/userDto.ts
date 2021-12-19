export class UserDto{

    username: string;
    fullName: string;
    password: string;
    confirmPassword: string;


    constructor(){
        this.username = '';
        this.fullName = '';
        this.password = '';
        this.confirmPassword = '';

    }
}