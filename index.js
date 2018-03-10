const SonicPiClient = require('./sonic-pi-client');

async function main(){
  const client = new SonicPiClient();
  console.log('sonic pi server starting...');
  await client.initialize();
  console.log('sonic pi server started');
  await client.sendCode('play 60');
  console.log('send play 60');
  setTimeout(async() => {
    await client.endServer();
    console.log('close sonic pi server');
    process.exit();  
  },5000);
}

main();