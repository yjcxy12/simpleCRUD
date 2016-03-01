import superagent from 'superagent';

export function getUserList() {
    return new Promise((resolve, reject) => {
        superagent
            .get('/users')
            .end((err, res) => {
                if (err !== null) {
                    return reject(err);
                }
                return resolve(res.body);
            });
        // resolve([
        //     {
        //         id: 1,
        //         firstname: 'Jeff',
        //         surname: 'Stelling',
        //         category: 'Admin'
        //     },
        //     {
        //         id: 2,
        //         firstname: 'Chris',
        //         surname: 'Kamara',
        //         category: 'Developer'
        //     },
        //     {
        //         id: 3,
        //         firstname: 'Jim',
        //         surname: 'White',
        //         category: 'Developer'
        //     },
        //     {
        //         id: 4,
        //         firstname: 'Natalie',
        //         surname: 'Sawyer',
        //         category: 'Designer'
        //     }
        // ]);
    });
}

// let _id = 4;
export function createUser(user) {
    return new Promise((resolve, reject) => {
        superagent
            .post('/users/new')
            .send(user)
            .end((err, res) => {
                if (err !== null) return reject(err);
                return resolve(res.body);
            });
        // _id += 1;
        // resolve({
        //     success: true,
        //     id: _id
        // });
    });
}

export function updateUser(user) {
    return new Promise((resolve, reject) => {
        superagent
            .put(`/users/${user.id}`)
            .send(user)
            .end((err, res) => {
                if (err !== null) return reject(err);
                return resolve(res.body);
            });
        // resolve({
        //     success: true
        // });
    });
}

export function removeUser(id) {
    return new Promise((resolve, reject) => {
        superagent
            .del(`/users/${id}`)
            .end((err, res) => {
                if (err !== null) return reject(err);
                return resolve(res.body);
            });
        // resolve({
        //     success: false,
        //     error: 'something wrong'
        // });
    });
}
