const { DefaultContext, DefaultLogger, DefaultRequestMaker } = require('crawl-e')
const RedditResponseParser = require('./RedditResponseParser')

let context = new DefaultContext()
let logger = new DefaultLogger()
let requestMaker = new DefaultRequestMaker()
requestMaker.logger = logger

let responseParser = new RedditResponseParser() // <<< [1]
responseParser.logger = logger // <<< [1]

requestMaker.get('https://www.amazon.de/gp/video/storefront?contentType=movie&contentId=home', context, (err, res) => {
  if (err) {
    console.error(`Oh noo, sth. wen't wrong: ${err}`)
    return
  }
  console.log('Happy', res.status, '🙂')

  responseParser.parsePostsList(res, context, (err, posts) => {  // <<< [2]
    // skipping error handling, as we know there no errors in this script, since we are not calling anything async yet
    console.log('POSTS:')
    console.log(posts)
  })
})
