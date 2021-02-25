const { spawn } = require('child_process');
Array.from({length: 30}).map((_, index) => {
  console.log('Running process withCountCheck index: ', index);
  const kid = spawn('node', ['run.js', 'withCountCheck', index]);
  kid.stdout.on('data', data => console.log(data.toString()));
});

Array.from({length: 30}).map((_, index) => {
  console.log('Running process upsert index: ', index);
  const kid = spawn('node', ['run.js', 'upsert', index]);
  kid.stdout.on('data', data => console.log(data.toString()));
});
