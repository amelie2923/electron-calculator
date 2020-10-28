const controller = {};


controller.indexView = async (req, res, next) => {
  try {
    res.render('index.ejs')

  } catch (error) {
    console.log(error)
  }
}


/*
  Algo simple calculatrice

  -L'utilisateur clique sur un chiffre
  - Le programme récupère ce chiffre

  - L'utilisateur clique sur un opérateur (+, -, x, /)

  - L'utilisateur clique sur un deuxieme chiffre
  - Le programme récupère ce chiffre

  - Le programme effectue le calcul grâce à l'opérateur

  - L'utilisateur clique sur =

  - Le programme donne le résultat du calcul sur l'écran de la calculatrice
  - Le programme stocke le résultat du calcul dans local storage (10 derniers resultats)


*/

module.exports = controller;