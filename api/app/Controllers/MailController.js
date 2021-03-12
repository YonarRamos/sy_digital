'use strict'
const nodemailer = require('nodemailer')
const transport = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {user: 'julioromero138@@gmail.com', pass: 'julioromero22!'}
})

class MailController {
    async index({request}){
        const { email , desc}= request.all();
        sendWelcomEmail(email)
        resdWelcomEmail('danielitowanchupi22@gmail.com',email , desc)
    }
}
function sendWelcomEmail(email){
    return transport.sendMail({
        from: "admin <julioromero138@gmail.com>",
        to: email,
        subject: "systelec S.A",
        html: `<div>
            <p> Su Usuario Fue recibido con exito! Pronto recibira la confirmacion!
              Saludos!
            </p>
               </div>`
    })
}
function resdWelcomEmail(email ,emailUsuario, desc){
    return transport.sendMail({
        from: 'admin <julioromero138@gmail.com>',
        to: email,
        subject: "systelec S.A",
        html: `<div>
           <p>${desc}</p>
           <p>${emailUsuario}</p>
          </div> `
    })
}

module.exports = MailController