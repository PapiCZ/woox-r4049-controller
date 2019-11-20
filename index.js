const TuyAPI = require('tuyapi')
const fs = require('fs')

const device = new TuyAPI(JSON.parse(fs.readFileSync('config.json')));

device.find().then(() => {
    device.connect();
});

device.on('connected', () => {
    if(process.argv[2] == 'off') {
        device.set({set: false})
    } else if(process.argv[2] == 'on') {
        device.set({set: true})
    } else {
        device.set({
            multiple: true, 
            data: {
                '1': true,
                '2': 'colour',
                '5': process.argv[2].slice(0, 6) + '00000000'
            }
        });
    }
});

device.on('data', data => {
    device.disconnect()
});
