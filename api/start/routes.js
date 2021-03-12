'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/api/v1', () => {
  return { greeting: 'Welcome API OT-SOf - Systelec S.A' }
})

//users
Route.post("api/v1/register" ,  "UserController.store");
Route.post("api/v1/login", "UserController.login");
Route.get("api/v1/user", "UserController.index");
Route.get("api/v1/user/:id", "UserController.show");
Route.get("api/v1/loginUsersAutomatico", "UserController.loginToken");


//lineas
Route.post("api/v1/line" ,  "LineController.store");
Route.get("api/v1/line", "LineController.index");

//Maquinas
Route.get("api/v1/machine" ,  "MachineController.index");
Route.post("api/v1/machine" ,  "MachineController.store");
Route.get("api/v1/statusMachine" ,  "StatusMachineController.index");


//Company
Route.get("api/v1/company" ,  "CompanyController.index");
Route.get("api/v1/companyName" ,  "CompanyController.CompanyName");
Route.get("api/v1/company/:id" ,  "CompanyController.show");
Route.post("api/v1/company" ,  "CompanyController.store");


//prueba de mail
Route.post("api/v1/email" ,  "MailController.index");