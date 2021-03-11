"use strict";

const User = use("App/Models/User");
const Rol = use("App/Models/Rol");
const Company = use("App/Models/Company");
//Ejecucion al inicio de servidor API
first_cycle();


function first_cycle(){
    create_user('systelec' , 'admin@systelec.com' , 'edsd5450' , 1 , 1);
    create_rol(1 , 'admin');
    create_company(1 , 'systelec')
}

async function create_rol(id , name){
    try {
        await Rol.firstOrFail()
    } catch (error) {
        const rol = new Rol()
        rol.id = id 
        rol.name = name
        await rol.save();
    }
}

async function create_company( id , name){
    try {
        await Company.firstOrFail()
    } catch (error) {
        const company = new Company()
        company.id = id 
        company.name = name
        await company.save();
    }
}

async function create_user(username , email , password , company_id ,rol_id){
    try {
        await User.firstOrFail()
    } catch (error) {
        const user = new User()
        user.username = username
        user.email = email 
        user.password = password
        user.company_id = company_id
        user.rol_id = rol_id
        await user.save();
    }
}

