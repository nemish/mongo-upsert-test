const { spawn } = require('child_process');
Array.from({length: 20}).map((_, index) => {
  console.log('Running process index: ', index);
  const kid = spawn('node', ['run.js', index]);
  kid.stdout.on('data', data => console.log(data.toString()));
})
