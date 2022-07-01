var ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        branch: 'gh-pages',
        repo: 'https://github.com/sda782/miss-fortune.git'
    },
    () => {
        console.log('Deploy Complete!')
    }
)