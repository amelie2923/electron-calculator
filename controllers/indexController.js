const controller = {};


controller.indexView = async (req, res, next) => {
  try {
    res.render('index.ejs')

  } catch (error) {
    console.log(error)
  }
}

module.exports = controller;