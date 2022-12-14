require("dotenv").config();

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const {
  newUserController,
  getUserController,
  loginController,
  changePassController,
  modifyUserController,
} = require("./controllers/users");

const {
  getServicesController,
  newServiceController,
  commentServiceController,
  getAllServsController,
  myComsController,
  uploadController,
  allGroupsCotroller,
  createGroupController,
  delIdGroupController,
  delAllGroupsController,
  getAllVallsController,
  createJobController,
  createValController,
  solvJobController,
  delIdServiceController,
  getAllCommentsController,
  checkStayJobCotroller,
  checkIfJobIsSolvedController,
  getServController,
} = require("./controllers/services");

const { authUser } = require("./middleware/midUser");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(fileUpload());

//Rutas users
app.post("/user", newUserController); //crea usuario
app.post("/login", loginController); //loguea usuario
app.get("/userParams", authUser, getUserController); //recupera datos de usuario
app.put("/modifyUser", authUser, modifyUserController); //Modifica el perfil del usuario
app.put("/chanPass", authUser, changePassController); //Cambia la contraseña del usuario

//Rutas servicios
app.get("/", getServicesController); //devolver lista de servicios
app.post("/createService", authUser, newServiceController); //crear nuevo servicio
app.get("/myServs/:id", authUser, getAllServsController); //devuelve todos los servicios de un usuario
app.get("/allComOneServ/:id", authUser, getAllCommentsController); //devuelve todos los comentarios de un servicio
app.post("/addCom", authUser, commentServiceController); //hacer comentarios a un servicio
app.get("/myComs/:id", authUser, myComsController); //devuelve lista de comentarios de un servicio
app.get("/seeGroups", authUser, allGroupsCotroller); //devuelve todos los grupos
app.post("/newGroup", authUser, createGroupController); //crea un nuevo grupo para los servicios
app.delete("/delIdServ/:id", authUser, delIdServiceController); //borra un servicio propio por id
app.delete("/delIdGroup", authUser, delIdGroupController); //borrar un grupo por id
app.delete("/delAllGroups", authUser, delAllGroupsController); //borra todos los grupos
app.post("/uploadFile", authUser, uploadController); //sube un archivo al servidor
app.get("/getAllVals/:id", authUser, getAllVallsController); //devuelve las valoraciones de un usuario
app.post("/newJob", authUser, createJobController); //crea un trabajo nuevo
app.get("/imInThatJob", authUser, checkStayJobCotroller); //comprueba si el usuario loggeado tiene un trabajo concreto
app.post("/newVal", authUser, createValController); //crea una valoracion de un trabajo
app.put("/solved/:id", authUser, solvJobController); //Marca trabajo como resuelto
app.get("/solved", authUser, checkIfJobIsSolvedController); //Comprueba si un trabajo esta realizado
app.get("/serv/:id", authUser, getServController); //Devuelve los datos de un servicio

//Cors
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
*/
//404
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

//errores
app.use((error, req, res, next) => {
  res.status(error.httpStatus || 500).send({
    status: error.httpStatus,
    message: error.message,
  });
});

//lanzar server
app.listen(process.env.BACK_PORT, () => {
  console.log("Servidor en marcha!", process.env.BACK_PORT);
});
