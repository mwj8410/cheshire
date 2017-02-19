module.exports = (req, res) => {
  if (!req.session) {
    req.session.destroy(function(err) {
      return res.sendStatus(200);
    });
  } else {
    return res.sendStatus(200);
  }
};
