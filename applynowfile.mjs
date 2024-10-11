let myapplied=[];
export default class JobApply{


    constructor(id,name,email,contact,resume){
        this.id=id,
        this.name=name,
        this.email=email,
        this.contact=contact,
        this.resume=resume

    }


    static add(name,email,contact,resume){

        let jobApply=new JobApply(
            myapplied.length+1,
            name,email,contact,resume
        );

        myapplied.push(jobApply);

    }

    static getAll(){
        return myapplied;
    }


}


