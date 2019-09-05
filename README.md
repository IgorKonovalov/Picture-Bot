# Picture-Bot
Simple telegram bot to automatically post pictures to telegram group from Smugmug. Heroku setup is based on [heroku-node-telegram-bot](https://github.com/odditive/heroku-node-telegram-bot/). For deployment please refer for original documentation. 

It works through heroku scheduler, see [scheduler docs](https://devcenter.heroku.com/articles/scheduler)

While scheduler is initializing app. it starts index.js (package.json start command), it calls initializeBot.js, and than scheduler executes sendPictureToGroup.js

You need a list of public links uploaded to Smugmug.

See .env_example and src/data/imagesData_example.json for example of parameters you'll need in order to use bot

