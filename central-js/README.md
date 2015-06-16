== How to build

=== Install dependencies

    npm install
    cd client
    bower install
    npm install

=== Test

    grunt
    cd client
    grunt debug

=== Development

    grunt
    cd client
    grunt dev

=== Local environment configuration

Do not change `config.js`.

Create `local_config.js` and define section to be updated, e.g.:

    module.exports = {
        'server': {
            'protocol': 'http',
            'key': '/sybase/cert/server.key',
            'cert': '/sybase/cert/server.crt',
            'port': '8001'
        }
    };

