class HomeController {
    async index(req, res) {
        res.send('APP Express - Guia do programador')
    }

    async validate(req, res) {
        res.send('okay')
    }
}

module.exports = new HomeController()