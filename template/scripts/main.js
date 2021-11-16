var {execSync} = require('child_process');

(async function () {
  if (process.platform === 'darwin') {
    console.log(
      '                  🧐🧐🧐🧐🧐 Starting pod install!! 🧐🧐🧐🧐🧐',
    );
    await execSync('cd ios && pod install', {stdio: 'inherit'});
    console.log('                      ✨✨✨✨✨ Pod done!!! ✨✨✨✨✨');
  }
})();
