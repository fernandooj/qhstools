'use strict';
let nodemailer = require('nodemailer');
let userServices = require('./../services/usersService.js') 
let fs = require('fs');
let path = require('path');
let randonNumber=null;  /// numero randon que genera el codigo de verificacion, linea 35
let transporter=null;   /// variable que guarda la configuracion para el envio del email
let client = null; 

let moment   = require('moment');
let fecha = moment().format('YYYY-MM-DD-h-mm')

///////////////////////////////////////////////////////////////////////////
/*
    CONFIGURACION DATOS TWILIO
*/
///////////////////////////////////////////////////////////////////////////
client = require('twilio')( 
    'AC4befe78c65f3b0e70b62d21d9087a74f', //TWILIO_ACCOUNT_SID
    '267e2522810ddde9dc330acbc9ad6fd0'//TWILIO_AUTH_TOKEN
);

///////////////////////////////////////////////////////////////////////////
/*
    CONFIGURACION DEL CORREO
*/
///////////////////////////////////////////////////////////////////////////
transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'weplanapp@gmail.com', // generated ethereal user
        pass: 'appweplan'  // generated ethereal password
    }
});

module.exports = function(app, passport){
    ///////////////////////////////////////////////////////////////////////////
    /*
    Guardar solo email
    */
    ///////////////////////////////////////////////////////////////////////////

    app.post('/x/v1/user/sign_up', function(req, res){
        userServices.getEmail(req.body, function(err, users){
            randonNumber = Math.floor(1000 + Math.random() * 9000);
            if (users) {
                if(users["estado"]=='inactivo'){
                    userServices.modificaCodigo(req.body, randonNumber, function(err, user){
                        if(req.body.tipo=='email'){
                            let mailOptions = {
                                from: '<weplanapp@weplanapp.com>',                              // email del que se envia
                                to:   req.body.username,                                        // al usuario que se la va enviar
                                subject: 'Registro',                                            // mensaje en el sujeto
                                html:  `Tu codigo de verificacion es:<b> ${randonNumber} </b>`  // texto
                            };
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                            });
                            res.json({ status: 'SUCCESS', message: 'Reenvieando mensaje', code:1 });
                        }else{
                            client.api.messages
                                .create({
                                  body: `Tu codigo es: ${randonNumber}` ,
                                  to:  `+57${req.body.username}`,
                                  from: '+17328750948',
                                }).then(function(data) {
                                    res.json({ status: 'SUCCESS', message: 'Reenvieando el mensaje', code:1 });
                                }).catch(function(err) { 
                                    res.json({ status: 'SUCCESS', message: 'no se pudo enviar el msn', code:0 });
                            });      
                        } 
                    })     
                }else{
                    res.json({ status: 'FAIL', message: 'este usuario ya existe', code:2 });    
                }
            }else{
                userServices.createUser(req.body, randonNumber, null, function(err, user){
                    if(err){
                        return res.json({ err:err })
                    }else{
                        if(req.body.tipo=='email'){
                            let mailOptions = {
                                from: '<weplanapp@weplanapp.com>',                              // email del que se envia
                                to: user.username,                                        // al usuario que se la va enviar
                                subject: 'Registro',                                            // mensaje en el sujeto
                                html:  `Tu codigo de verificacion es:<b> ${randonNumber} </b>`  // texto
                            };
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                            });
                            res.json({ status: 'SUCCESS', message: 'Usuario Creado', user: user, code:1 });
                        }else{
                            client.api.messages
                                .create({
                                  body: `Tu codigo es: ${randonNumber}` ,
                                  to:  `+57${req.body.username}`,
                                  from: '+17328750948',
                                }).then(function(data) {
                                    res.json({ status: 'SUCCESS', message: 'Usuario Creado', user, code:1 });
                                }).catch(function(err) {
                                   res.json({ status: 'ERROR', message: 'Usuario creado, pero no se envio el mensaje', err, user, code:2 });
                            });      
                        }
                    }
                })  
            }             
        })
    })


    app.post('/x/v1/user/resend_token', function(req, res){
        if(req.body.tipo==1){
            let mailOptions = {
                from: '<weplanapp@weplanapp.com>',                              // email del que se envia
                to: req.body.username,                                        // al usuario que se la va enviar
                subject: 'Registro',                                            // mensaje en el sujeto
                html:  `Tu codigo de verificacion es:<b> ${randonNumber} </b>`  // texto
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
            });
            res.json({ status: 'SUCCESS', message: 'Codigo enviado', code:1 });
        }else{
            client.api.messages
                .create({
                  body: `Tu codigo es: ${randonNumber}` ,
                  to:  req.body.username,
                  from: '+17328750948',
                }).then(function(data) {
                    res.json({ status: 'SUCCESS', message: 'Codigo enviado', code:1 });
                }).catch(function(err) {
                    res.json({ status: 'ERROR', message: 'no se pudo crear el usuario', code:0 });
            });      
        }
    })


    ///////////////////////////////////////////////////////////////////////////
    /*
    activar usuario despues de insertar el codigo
    */
    ///////////////////////////////////////////////////////////////////////////
    app.post('/x/v1/user/token/', function(req, res, next){
        userServices.verificaToken(req.body, function(err, token){
            if(!token){
                return res.json({ status: 'FAIL', message: 'no conciden', code:0})        
            }else{
            
                userServices.activaDesactiva(token._id, true, function(err2, activado){  
                    if (err2) {
                         return res.json({ status: 'FAIL', err2, code:0})                  
                    }else{
                        req.session.usuario = activado
                        return res.json({ status: 'SUCCESS', message: 'Usuario activado', user: activado });  
                    }
                })
            }
        }) 
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    modificar usuarios
    */
    ///////////////////////////////////////////////////////////////////////////
    app.put('/x/v1/user/update/', function(req, res, next){       
        userServices.edit(req.body, req.session.usuario._id, function(err, user){
            if(!user){
                res.json({ status: 'FAIL', message: err}) 
            } else{
                res.json({ status: 'SUCCESS', message: 'Usuario Editado', user });               
            }
        }) 
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    modifica Avatar 
    */
    ///////////////////////////////////////////////////////////////////////////
    app.put('/x/v1/user/avatar', function(req, res){
        let ruta = null
        let fullUrl = null
        if (req.files) {
            let extension = req.files.avatar.name.split('.').pop()
            let randonNumber = Math.floor(90000000 + Math.random() * 1000000)
            fullUrl = '../../front/docs/public/uploads/avatar/'+fecha+'_'+randonNumber+'.'+extension
            ruta = req.protocol+'://'+req.get('Host') + '/public/uploads/avatar/'+fecha+'_'+randonNumber+'.'+extension
        }else{
            ruta = req.protocol+'://'+req.get('Host') + '/avatar.png'
        }
        
        userServices.avatar(req.session.usuario._id, ruta, function(err, user){
            if(!user){
                res.json({ status: 'FAIL', message: err}) 
            } else{
                res.json({ status: 'SUCCESS', message: 'Avatar actualizado', user }); 
                fs.rename(req.files.avatar.path, path.join(__dirname, fullUrl))                
            }
        })
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
        login 
    */
    ///////////////////////////////////////////////////////////////////////////
    app.post('/x/v1/user/login', function(req,res,next){
        userServices.login(req.body, function(err, user){
            if (err) {
                res.json({status:'FAIL', err, code:0 })
            }else{
                if(user==null){
                    res.json({status:'FAIL', user: 'Usuario no existe', code:2 })
                }else{
                    if(user.validPassword(req.body.password)){
                        req.session.usuario = user
                        res.json({status:'SUCCESS', user: user, code:1 })
                        
                    }else{
                        res.json({status:'FAIL', user: 'Datos incorrectos', code:0 })
                        
                    }     
                }
            }
        })
    });

    ///////////////////////////////////////////////////////////////////////////
    /*
    LOGIN SOCIAL MEDIA GOOGLE / FACEBOOK
    */
    ///////////////////////////////////////////////////////////////////////////
    app.post('/x/v1/user/facebook', function(req, res){
        userServices.getEmail(req.body.username, (err, data)=>{   
            if (!data) {
                console.log(1)
                existe(req, res)
            }else{
                console.log(2)
                req.session.usuario = {user:data}
                res.json({status: 'SUCCESS', data, code:1})
            }
        })
    })
    let existe = function(req, res){
        userServices.facebook(req.body, (err, user)=>{
            if (err) {
                res.json({status:'FAIL', err, code:0})    
            }else{
                req.session.usuario = {user:user}
                res.json({status: 'SUCCESS', mensaje:user, code:1})
            }
        })
    }


    ///////////////////////////////////////////////////////////////////////////
    /*
    perfil del usuario
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/user/profile', function(req, res){
        if (req.session.usuario!==undefined) {
            userServices.getEmail(req.session.usuario, (err, usuario)=>{
                if (err) {
                    res.json({status:'FAIL', mensaje: 'SIN SESION', code:0 })
                }else{
                    res.json({status:'SUCCESS', usuario, code:1})  
                }
            })
        }else{
             res.json({status:'FAIL', user: 'SIN SESION', code:0 })
        }
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    lista usuarios sin condiciones
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/user/todos', function(req,res){
        if(req.session.usuario){
            if (req.session.usuario.acceso=='superAdmin') {
                userServices.get(function(err, usuarios){
                    if(!err){
                        res.json({status:'SUCCESS', usuarios})
                    }else{
                        res.json({ status: 'FAIL', err}) 
                    }
                })
            }else{
                res.json({ status: 'FAIL', message:'No tienes acceso'})
            }
        }else{
            res.json({ status: 'FAIL', message:'usuario no logueado'})  
        }
    })


    ///////////////////////////////////////////////////////////////////////////
    /*
    lista usuarios solo activos y suscriptores
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/user/activos', function(req,res){
        if(req.session.usuario){
            userServices.getActivos(function(err, usuarios){
                if(!err){
                    res.json({status:'SUCCESS', usuarios})
                }else{
                    res.json({ status: 'FAIL', err}) 
                }
            })
        }else{
            res.json({ status: 'FAIL', message:'usuario no logueado'})  
        }
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    Activa / Desactiva
    */
    ///////////////////////////////////////////////////////////////////////////
    app.put('/x/v1/user/estado', function(req,res){
        if(req.session.usuario){
            if (req.session.usuario.acceso=='superAdmin') {
                userServices.activaDesactiva(req.body.id, req.body.estado, function(err, usuarios){
                    if(!err){
                        res.json({status:'SUCCESS', mensaje:'Usuario Activado', usuarios})
                    }else{
                        res.json({ status: 'FAIL', err}) 
                    }
                })
            }else{
                res.json({ status: 'FAIL', message:'No tienes acceso'})
            }
        }else{
            res.json({ status: 'FAIL', message:'usuario no logueado'})  
        }
    })

    ///////////////////////////////////////////////////////////////////////////
    /*
    LOG OUT
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/logout', function(req, res) {
        req.session.usuario = null;
        req.session = null;
        console.log(req.session)
        res.json({status: 'SUCCESS', message:'sesion terminada', code:1})
    });

         
}