class HttpPresenter {
    constructor (req, res) {
        this.req = req;
        this.res = res;
    }

    presentSuccess ({status, body}) {

        if (status) {
            this.res.sendStatus(status); // это для создания узера, например, нам только статус нужно отдать что всё заебок
        }

        if (body) {
            this.res.status(200).send(body); // а тут отдавать результат поиска search user, например
        }
        
    }

    presentFailure (err) {

        this.res.status(err.httpCode).send(err);
    }

}

module.exports = HttpPresenter;