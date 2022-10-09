import db from '../models/index'
import CRUDService from '../services/CRUDService'


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()

        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
        })
    } catch (e) {
        console.log(e)
    }
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    console.log(message)
    return res.send('post crud')
}

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    console.log(data)
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDService.getUserById(userId)
        return res.render('editCRUD.ejs', {
            user: userData
        })
    }
    else {
        return res.send('user not found')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body
    let allUser = await CRUDService.updateUserData(data)
    return res.render('displayCRUD.ejs', {
        dataTable: allUser
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id

    await CRUDService.deleteUserById(id)
    return res.send('ahahah')
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}