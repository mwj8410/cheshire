module.exports = (req, res) => {
  if (!req.session) {
    req.session.regenerate(function(err) {
      return res.send(req.session);
    });
  } else {
    return res.send(req.session);
  }
};
