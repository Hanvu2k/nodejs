import bcrypt from 'bcryptjs';
import db from '../models/index'

var salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleID: data.roleID,
            })
            resolve('ok bro')
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hash(password, salt)
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }
    })
}


let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true
            })
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}


let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address

                await user.save()
                let allUser = await db.User.findAll()
                resolve(allUser)
            } else {
                resolve()
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
            })

            if (user) {
                await user.destroy()
                resolve();
            } else {
                resolve()
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}