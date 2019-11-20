const TuyAPI = require('tuyapi')
const fs = require('fs')

const device = new TuyAPI(JSON.parse(fs.readFileSync('config.json')));

device.find().then(() => {
    device.connect();
});

device.on('connected', () => {
    device.set({
        multiple: true, 
        data: {
            '1': true,
            '2': 'colour',
            '5': process.argv[2].slice(0, 6) + '00000000'
        }
    });
});

device.on('data', data => {
    device.disconnect()
});
