import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import JobSeeker from "./src/controller/homepage.mjs";
import path from "path";
import session from 'express-session';
import { auth } from './src/middleware/auth.middleware.mjs';
import { upload } from './src/middleware/fileupload.middleware.mjs';


const app = express();
const myjob = new JobSeeker();

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/resume', express.static('resume'));


// Routes
app.get('/', myjob.getHomePage);
app.get('/registration', myjob.getRegister);
app.post('/registration', myjob.postRegister);
app.get('/jobs', myjob.getJobs);
app.get('/login', myjob.getLogin);
app.post('/login', myjob.postLogin);
app.get('/logout', myjob.logout);

// Protected routes (only for recruiters)
app.get('/newapplication', auth, myjob.getapplicationUpdate);
app.post('/newapplication', auth, myjob.postapplicationUpdate);
app.get('/jobdetails/:id', myjob.getjobdetails);
app.get('/updatenewapplication/:id', auth, myjob.getUpdateApplication);
app.post('/updatenewapplication/:id', auth, myjob.postUpdateNewApplication);
app.post('/deleteJob/:id', auth, myjob.deleteJob);

app.get('/applynow', myjob.getApplyNow);
app.post('/applynow', upload.single('resume'), myjob.postApplyNow);
app.get('/myjobseeker', myjob.getjobSeekerfile);


app.get('/myjobseeker',myjob.getMyApplicants);

app.listen(4302, () => console.log('Server started on port 4301'));