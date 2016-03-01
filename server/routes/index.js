import { Router as routerFactory } from 'express';
import fs from 'fs';
import path from 'path';

const router = routerFactory();

function _errorOpeningFile(next) {
    const error = new Error('Opening json file failed');
    error.status = 404;
    next(error);
}

function _errorValidation(next) {
    const error = new Error('Validation failed');
    error.status = 417; // Expectation failed
    next(error);
}

function _generateId(userList) {
    return (userList.reduce((acc, current) =>
        Math.max(acc, current.id)
    , 0) + 1).toString();
}

function _validateName(name) {
    return name && name.length && name.length > 0 && /^[a-zA-Z\s-]{1,30}$/.test(name);
}

function _validateCategory(category) {
    return ['admin', 'developer', 'designer'].indexOf(category) > -1;
}

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/users', (req, res, next) => {
    fs.readFile(path.join(__dirname, '../data.json'), (err, data) => {
        if (err !== null) {
            _errorOpeningFile(next);
            return;
        }
        res.json(JSON.parse(data));
    });
});

router.post('/users/new', (req, res, next) => {
    const filePath = path.join(__dirname, '../data.json');
    fs.readFile(filePath, (err, data) => {
        if (err !== null) {
            _errorOpeningFile(next);
            return;
        }
        // Validation
        const userList = JSON.parse(data);
        const user = req.body;
        if (!_validateName(user.firstname) ||
            !_validateName(user.surname) ||
            !_validateCategory(user.category)) {
            _errorValidation(next);
            return;
        }

        // Edit input
        user.id = _generateId(userList);
        user.firstname = user.firstname.trim();
        user.firstname = user.firstname.trim();

        const newUserList = userList.concat(user);

        // Write result
        fs.writeFile(filePath, JSON.stringify(newUserList), (error) => {
            if (error !== null) {
                _errorOpeningFile(next);
                return;
            }
            res.json({
                success: true,
                id: user.id
            });
        });
    });
});

router.put('/users/:id', (req, res, next) => {
    const filePath = path.join(__dirname, '../data.json');
    fs.readFile(filePath, (err, data) => {
        if (err !== null) {
            _errorOpeningFile(next);
            return;
        }

        // Validation
        const userList = JSON.parse(data);
        const editUser = req.body;
        if (!_validateName(editUser.firstname) ||
            !_validateName(editUser.surname) ||
            !_validateCategory(editUser.category)) {
            _errorValidation(next);
            return;
        }

        // Edit input
        editUser.firstname = editUser.firstname.trim();
        editUser.surname = editUser.surname.trim();

        const newUserList = userList.map((user) => {
            if (user.id !== editUser.id) return user;
            return editUser;
        });

        // Write result
        fs.writeFile(filePath, JSON.stringify(newUserList), (error) => {
            if (error !== null) {
                _errorOpeningFile(next);
                return;
            }
            res.json({ success: true });
        });
    });
});

router.delete('/users/:id', (req, res, next) => {
    const filePath = path.join(__dirname, '../data.json');
    fs.readFile(filePath, (err, data) => {
        if (err !== null) {
            _errorOpeningFile(next);
            return;
        }
        const userList = JSON.parse(data);
        const newUserList = userList.filter((user) =>
            user.id !== req.params.id
        );
        fs.writeFile(filePath, JSON.stringify(newUserList), (error) => {
            if (error !== null) {
                _errorOpeningFile(next);
                return;
            }
            res.json({ success: true });
        });
    });
});

export default router;
