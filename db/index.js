const { uid } = require("uid");
const axios = require("axios");

/* 
student {
    name,
    location
}

rosterDB = [
    student1,
    student2
]
*/

/* let rosterDB = [
    {
        name: "Gen",
        location: "New Jersey",
    },
    {
        name: "Gen",
        location: "Boston",
    },
    {
        name: "Chandan",
        location: "Los Angeles",
    },
]; */

class Roster {
    constructor() {}

    // Create | POST
    async addStudent({ name, location }) {
        // unique identifier
        const id = uid();
        this[id] = {
            id,
            name,
            location,
            profilePic: "",
        };

        await this.#getProfilePhoto(location, this[id]);

        return this[id];
    }

    // Read | GET
    getOneStudent(id) {
        return this[id];
    }

    #getAllStudents() {
        let result = [];

        for (let [, value] of Object.entries(this)) {
            result.push(value);
        }

        return result;
    }

    getStudents({ name, location }) {
        // getAllStudents -> Object.values(this);
        let result = this.#getAllStudents();
        for (let [, value] of Object.entries(this)) {
            if (value.name === name) {
                result = result.filter((stu) => stu.name === name);
            }

            if (value.location === location) {
                result = result.filter((stu) => stu.location === location);
            }
        }

        return result;
    }

    // Update | PUT
    async updateStudent(id, { name, location }) {
        let student = this[id];
        if (student) {
            student.name = name ? name : student.name;

            if (location) {
                student.location = location;
                await this.#getProfilePhoto(location, student);
            }
        }

        return student;
    }

    // Delete | DELETE
    deleteStudent(id) {
        if (this[id]) {
            delete this[id];
            return true;
        } else {
            return false;
        }
    }

    async #getProfilePhoto(location, currentObject) {
        const unsplashURL =
            `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=` +
            location;
        let response = await axios.get(unsplashURL);

        currentObject.profilePic = response.data.results[0].urls.small;
    }
}

module.exports = {
    rosterDB: new Roster(),
};
