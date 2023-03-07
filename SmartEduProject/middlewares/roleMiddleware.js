// gelen rollere gore
module.exports = (roles) => {
  return (req, res, next) => {
    const userRole = req.body.role;
    // eger kullaninicini rolu istenilen role uyuyorsa islemin yapilmasi saglandi
    if (roles.includes(userRole)) {
      next;
    } else {
      return res.status(401).send('you cant do it');
    }
  };
};
