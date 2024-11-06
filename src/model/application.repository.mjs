import { getdb } from "../config/mongodb.mjs";

export default class ApplicationRepository {
    constructor() {
        this.collection = "application";
    }

    async add(jobCategory, jobLocation, jobDesignation, companyName, salary, totalPositions, totalOpenings, skills, applyBy) {
        try {
            // Get the database instance
            const db = await getdb(); // Assuming getdb() returns a promise that resolves to the database instance
            const collection = db.collection(this.collection);

            // Insert the document into the collection
            const result = await collection.insertOne({
                jobCategory,
                jobLocation,
                jobDesignation,
                companyName,
                salary,
                totalPositions,
                totalOpenings,
                skills,
                applyBy
            });

            return result; // Return the result of the insert operation
        } catch (err) {
            console.error("Error inserting document:", err);
            throw err; // Rethrow the error for further handling
        }
    }
}