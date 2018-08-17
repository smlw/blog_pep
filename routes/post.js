const express = require('express');
const router = express.Router();
const models = require('../models');

// GET for add

router.get('/add', (req, res) => {
    const id = req.session.userId;
    const login = req.session.userLogin;

    res.render('post/add', {
        user: {
          id,
          login
        }
      }); 
});

router.post('/add', (req, res) => {

  const title = req.body.title;
  const body = req.body.body;

  if(!title || !body){
    const fields = [];

    if(!title) fields.push('title');
    if(!body) fields.push('body');

    res.json({
      ok: false,
      error: 'Все поля должны быть запонены',
      fields
    })
  } else if (title.length < 3 || title.length > 64){
    res.json({
        ok: false,
        error: 'Длина заголовка от 3 до 64 символов',
        fields: ['title']
    });
  } else if (body.length < 3){
    res.json({
        ok: false,
        error: 'Длина текста от 3 символов',
        fields: ['body']
    });
  } else {
    models.Post.create({
        title,
        body
    }).then(post => {
      console.log(post);
      res.json({
        ok: true
      })
    }).catch(err => {
      console.log(err);
      res.json({
        ok: false
      })
    }) ;

  }

}); 

module.exports = router;