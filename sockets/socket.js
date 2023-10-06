const { comprobarJWT } = require("../helpers/jwt");
const {io} = require("../index");
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require("../controllers/socket");

//Mensaje de Sockets
io.on('connection', client => {
    console.log("Cliente conectado");

    const [valido, uid] = comprobarJWT(client.handshake.headers["x-token"]);
    
    //Verificar autenticación
    if(!valido){return client.disconnect();}

    //Cliente autenticado
    usuarioConectado(uid);

    //Ingresar al usuario a una sala específica
    //sala global, client.id, 651f4875d979c7685a25a7e2
    client.join(uid);

    //Escuchar del cliente el mensaje-personal
    client.on("mensaje-personal", async (payload) => {
        //TODO: Grabar mensaje
        await grabarMensaje(payload);

        io.to(payload.para).emit("mensaje-personal", payload);
    });

    //client.to(uid).emit("");

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

    // client.on("mensaje", (payload) => {
    //     console.log("Mensaje", payload);

    //     io.emit("mensaje", {admin: "Nuevo msj"});
    // });
  });