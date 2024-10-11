import { application } from "express";

let applications=[];

export default class JobApplication {
    constructor(
        id,
        jobCategory, 
        jobLocation, 
        jobDesignation, 
        companyName, 
        salary, 
        totalPositions, 
        totalOpenings, 
        skills, 
        applyBy
    ) {
        this.id=id,
        this.jobCategory = jobCategory;
        this.jobLocation = jobLocation;
        this.jobDesignation = jobDesignation;
        this.companyName = companyName;
        this.salary = salary;
        this.totalPositions = totalPositions;
        this.totalOpenings = totalOpenings;
        this.skills = Array.isArray(skills) ? skills : [skills];
        this.applyBy = applyBy;
    }

    static add(jobCategory, jobLocation, jobDesignation, companyName, salary, totalPositions, totalOpenings, skills, applyBy) {
        const newApplication = new JobApplication(
            applications.length+1,
            jobCategory, 
            jobLocation, 
            jobDesignation, 
            companyName, 
            salary, 
            totalPositions, 
            totalOpenings, 
            skills, 
            applyBy
        );
        applications.push(newApplication);
        return newApplication;
    }

    static get() {
        return applications;
    }

    static getId(id) {
       
        return applications.find(app => app.id === id);
    }

    static postId(myobject){
        let myapplicants=applications.findIndex((a)=>a.id===myobject.id);
    
        if(myapplicants !== -1) {
            applications[myapplicants].jobCategory = myobject.jobCategory;
            applications[myapplicants].jobLocation = myobject.jobLocation;
            applications[myapplicants].jobDesignation = myobject.jobDesignation;
            applications[myapplicants].companyName = myobject.companyName;
            applications[myapplicants].salary = myobject.salary;
            applications[myapplicants].totalPositions = myobject.totalPositions;
            applications[myapplicants].totalOpenings = myobject.totalOpenings;
            applications[myapplicants].skills = myobject.skills;
            applications[myapplicants].applyBy = myobject.applyBy;
        }
    }


    static mydeleteJob(id) {
        const index = applications.findIndex(job => job.id === id);
        if (index !== -1) {
            applications.splice(index, 1);
            return true;
        }
        return false;
    }
   
    
}

