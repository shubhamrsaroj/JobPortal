import { getdb } from "../config/mongodb.mjs";

let myapplied=[];


export default class JobApply{


    constructor(id,name,email,contact,resume){
        this.id=id,
        this.name=name,
        this.email=email,
        this.contact=contact,
        this.resume=resume

    }


    static async add(name,email,contact,resume){

        const mydb=getdb();

        const collection=mydb.collection("applynowusers");

        let jobApply=new JobApply(
            myapplied.length+1,
            name,email,contact,resume
        );

        myapplied.push(jobApply);

        await collection.insertOne(jobApply);
    
    }
    
    static gettheid(){
        return parseInt(myapplied.length);
    }

    static getAll(){
        return myapplied;
    }


}


