let _ = require('underscore');

module.exports = app => {
  /* define routes here */
  app.get('/users',(req,res) => {
    res.status(201).send({ users : app.users });
  });

  /**
   * @brief adds a new user to the database
   *
   * @param username
   * @param password
   * @param first_name
   * @param last_name
   */
  app.post('/user',(req,res) => {
    let user = req.body;
    if (!user.username){
      res.status(500).send( { error: "must define username" });
    } else if (!user.password) {
      res.status(500).send( { error: "password must be defined" });
    } else if (!user.first_name) {
    res.status(500).send( { error: "first_name must be defined" });
    } else if (!user.last_name) {
      res.status(500).send( { error: "last_name must be defined" });
    } else {
      user = { username : user.username, password : user.password, first_name : user.first_name,
            last_name : user.last_name, clipboard: []};
      app.users.push(user);
      res.sendStatus(201);
    }
  });

  /**
   * @brief gets information on a current user, specified by id
   *
   * @param username
   * @param password
   * @param first_name
   * @param last_name
   */
  app.get('/user/:id',(req,res) => {
    let userId = req.params.id;
    let user = _.findWhere(app.users, { username : userId });
    if (!user){
      res.sendStatus(404);
    } else {
      res.status(201).send({user : user});
    }
  });

  /**
   * @brief returns all the elements in a user's clipboard
   *
   * @param id
   */
  app.get('/user/:id/clipboard', (req,res) => {
    let userId = req.params.id;
    let user = _.findWhere(app.users, { username : userId });
    if (!user){
      res.sendStatus(404);
    } else {
      if (user.clipboard.length === 0)
        res.status(201).send({clipboard : ""});
      else
        res.status(201).send({clipboard : user.clipboard[user.clipboard.length-1]});
    }
  });

  /**
   * @brief returns all the elements in a user's clipboard
   *
   * @param id
   */
  app.post('/user/:id/clipboard', (req,res) => {
    if (!req.body.item){
      res.status(500).send( { error : `'item' is missing`})
    } else {
      let userId = req.params.id;
      let user = _.findWhere(app.users, { username: userId });
      if (!user) {
        res.sendStatus(404);
      } else {
        user.clipboard.push(req.body.item);
	if (user.clipboard.length > 100)
	      user.clipboard.shift();
        res.status(201).send({ clipboard: user.clipboard[user.clipboard.length-1] });
      }
    }
  });

  app.post('/session',(req,res) => {
    let username = req.body.username;
    if (!username){
      res.status(500).send('must include username');
    } else {
      let user = _.findWhere(app.users, { username : username});
      if (!user){
        res.status(400).send({ error : "unauthorized" });
      } else {
        res.status(200).send( { username : user.username });
      }
    }
  })
};
