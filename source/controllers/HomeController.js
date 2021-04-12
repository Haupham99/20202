import authen from "./../libs/authen";
import cfg from "./../libs/config";

let getHome = async function (req, res) {
  const level = await authen.IsAuthenticated(req.cookies["dG9rZW4"]);
  res.render("index");
};

module.exports = {
  getHome: getHome
};