const express = require('express')

const Controller = require('../../controllers/Web/DashboardController')

const Router = express.Router()

Router.get("/", Controller.getHome);
Router.get("/home", Controller.getHome);

Router.get("/login", Controller.getHome);
Router.post("/login", Controller.getHome);

Router.get("/obras", Controller.getConstructions);
Router.get("/obras/:id", Controller.getConstruction);

Router.get("/createObras", Controller.getCreateObras);
Router.post("/createObras", Controller.postCreateObras);

Router.post("/obras", Controller.getConstruction);
Router.post("/obras/:id", Controller.getConstruction);
Router.get("/obras/:id/deletar", Controller.deleteConstruction);

Router.get("/usuarios", Controller.getUsers);
Router.get("/usuarios/:id", Controller.getUser);

Router.post("/usuarios", Controller.getUser);
Router.get("/usuarios/:id", Controller.getUpdateUser);
Router.post("/usuarios/:id", Controller.postUpdateUser);
Router.get("/usuarios/:id/deletar", Controller.deleteUser);

Router.get("/administradores", Controller.getAdministrators);
Router.get("/administradores/:id", Controller.getAdministrator);

Router.get("/criarUsuario", Controller.getCriarUsuario);
Router.post("/criarUsuario", Controller.postCriarUsuario);

Router.get("/criarAdm", Controller.getCriarAdm);
Router.post("/criarAdm", Controller.postCriarAdm);

Router.post("/administradores", Controller.getAdministrator);
Router.get("/administradores/:id", Controller.getUpdateAdministrator);
Router.post("/administradores/:id", Controller.postUpdateAdministrator)
Router.get("/administradores/:id/deletar", Controller.deleteAdministrator);

Router.get("/tags", Controller.getListAllTags);
Router.post("/tags", Controller.postCreateTag);
Router.post("/tags/:id", Controller.postUpdateTag)
Router.get("/tags/:id/deletar", Controller.getDeleteTag);

module.exports = Router;