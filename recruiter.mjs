let recruiter = [];

export default class JobRecruiter {
    constructor(id, userName,companyName, email, password, phone, companyDescription) {
        this.id = id;
        this.companyName = companyName;
        this.userName=userName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.companyDescription = companyDescription;
    }
    
    static add(companyName, userName,email, password, phone, companyDescription) {
        let db = new JobRecruiter(
            recruiter.length + 1,
            companyName,
            userName,
            email,
            password,
            phone,
            companyDescription
        );
        recruiter.push(db);
    }

    static getAll(){
        return recruiter;
    }
    
    static isValidUser(email, password) {
        return recruiter.find((u) => u.email === email && u.password === password);
    }
}