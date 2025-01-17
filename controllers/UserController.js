const uModel = require("../models/UserModel");

exports.createUser = async (req, res) => {
  const { username, password, admin } = req.body;
  if (uModel.getUserbyName(username))
    return res.status(409).json({ message: "Este usuario já existe" });

  try {
    let user = await uModel.save(username, password, admin);
    return res.status(201).json({ message: "usuario cadastrado", user: user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "erro ao cadastrar usuario", error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    user = await uModel.getUserbyName(req.body.username);

    if (!user)
      return res.status(404).json({ message: "usuario não encontrado" });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "erro com a busca do usuario", error: error.message });
  }
};
