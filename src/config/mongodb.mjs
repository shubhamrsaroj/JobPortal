import {MongoClient} from 'mongodb';


const url = "mongodb://localhost:27017/myresumebuilderdatabase";
let client;

export const connectToMongodb=()=>{


    MongoClient.connect(url).then(clientInstance=>{
        client=clientInstance;
        console.log("connected to mongodb");
    }).then((err)=>{

        console.log(err);
    })
}


export const getdb=()=>{
    return client.db();
}