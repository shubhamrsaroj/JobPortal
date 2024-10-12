import JobRecruiter from "../model/recruiter.mjs";
import JobApplication from "../model/application.mjs";
import JobApply from "../model/applynowfile.mjs";

export default class JobSeeker {
    getHomePage(req, res) {
        res.render('home', { recruiter: req.session.userEmail });
    }
    
    getRegister(req, res) {
        res.render('registration', { recruiter: req.session.userEmail });
    }

    getLogin(req, res) {
        res.render('login', { recruiter: req.session.userEmail });
    }

    logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }

    getJobs(req, res) {
        const applications = JobApplication.get() || [];
        res.render('jobs', { 
            applications, 
            recruiter: req.session.userEmail
        });
    }
    
    postRegister(req, res) {
        let { companyName, userName, email, password, phone, companyDescription } = req.body;
        JobRecruiter.add(companyName, userName, email, password, phone, companyDescription);
        res.render('login', {recruiter: req.session.userEmail });
    }

    postLogin(req, res) {
        let { email, password } = req.body;
        let user = JobRecruiter.isValidUser(email, password);
        
        if (user) {
            req.session.userEmail = email;
            res.redirect('/jobs');
        } else {
            res.render('login', { 
                error: 'Invalid email or password',
                recruiter: req.session.userEmail 
            });
        }
    }

    getapplicationUpdate(req, res) {
        res.render('newapplication', { recruiter: req.session.userEmail });
    }

    postapplicationUpdate(req, res) {
        try {
            const {
                jobCategory,
                jobLocation,
                jobDesignation,
                companyName,
                salary,
                totalPositions,
                totalOpenings,
                skills,
                applyBy
            } = req.body;
    
            JobApplication.add(
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
    
            const applications = JobApplication.get();
            res.render('jobs', { 
                applications,
                recruiter: req.session.userEmail 
            });
        } catch (error) {
            res.render('newapplication', { 
                error: 'Failed to post job application',
                formData: req.body,
                recruiter: req.session.userEmail
            });
        }
    }

    getjobdetails(req, res) {
        const myid = req.params.id;
        const job = JobApplication.getId(parseInt(myid));

        const myalljob=JobApply.getAll();
        
        if (job) {
            res.render('jobdetails', { 
                job,myalljob,
                recruiter: req.session.userEmail
            });
        } else {
            res.status(404).render('jobdetails', { 
                error: 'Job not found',
                recruiter: req.session.userEmail
            });
        }
    }

    getUpdateApplication(req, res) {
        const myid = req.params.id;
        const job = JobApplication.getId(parseInt(myid));
        
        if (job) {
            res.render('updatenewapplication', { 
                job,
                recruiter: req.session.userEmail
            });
        } else {
            res.status(404).send('Job not found');
        }
    }

    postUpdateNewApplication(req, res) {
        const jobId = parseInt(req.params.id);
        const updatedJob = {
            id: jobId,
            jobCategory: req.body.jobCategory,
            jobLocation: req.body.jobLocation,
            jobDesignation: req.body.jobDesignation,
            companyName: req.body.companyName,
            salary: req.body.salary,
            totalPositions: req.body.totalPositions,
            totalOpenings: req.body.totalOpenings,
            skills: Array.isArray(req.body.skills) ? req.body.skills : [req.body.skills],
            applyBy: req.body.applyBy
        };
    
        JobApplication.postId(updatedJob);
    
        const applications = JobApplication.get();
        res.render('jobs', { 
            applications,
            recruiter: req.session.userEmail
        });
    }

    deleteJob(req, res) {
        const id = parseInt(req.params.id);
        JobApplication.mydeleteJob(id);    
        res.redirect('/jobs');
    }

    getApplyNow(req, res) {
        
        res.render('applynow');
       
    }

    postApplyNow(req, res) {
        const { name, email, contact } = req.body;
        const resume = req.file.filename;

        JobApply.add(name, email, contact, resume);

        
        res.redirect('/myjobseeker');
    }

    getjobSeekerfile(req, res) {
        const myjobapplied = JobApply.getAll();
        res.render('myjobseeker', { myjobapplied });
    }


    getMyApplicants(req,res){
        res.redirect('/myjobseeker');
    }
   

}
