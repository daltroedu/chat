const db = require('./db')

const Mensagens = db.sequelize.define('mensagens', {
  nickname: {
    type: db.Sequelize.STRING
  },
  conteudo: {
    type: db.Sequelize.TEXT
  },
  data: {
    type: db.Sequelize.STRING
  }
})

module.exports = Mensagens
//Mensagens.sync({force: true})
