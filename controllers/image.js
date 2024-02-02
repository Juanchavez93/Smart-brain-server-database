const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'e1b9138af91a4fdaab18a4609e76fb9b'
    });

    const handleApiCall = (req, res) => {
        app.models.predict('face-detection', req.body.input)
          .then(data => {
            res.json(data);
          })
          .catch(err => res.status(400).json('unable to work with API'))
      }

      const handleImage = (req, res, postgres) => {
        const { id } = req.body;
        postgres('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
          res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get entries'))
      }

      module.exports = {
        handleImage,
        handleApiCall
      }
