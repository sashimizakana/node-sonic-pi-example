const osc = require('node-osc');
const spawn = require('child_process').spawn;

class SonicPiClient {
  createOscClient(){
    return new osc.Client('127.0.0.1', 4557);
  }

  async sendCode(code){
    const dummyGUIId = "1";
    return new Promise((resolve,reject) => {
        this.client.send('/run-code', [dummyGUIId,code], (...args)=>{
        resolve(args);
      });
    });
  }

  async endServer(client){
    return new Promise((resolve,reject) => {
      this.client.send('/exit',()=>{
        process.kill(-this.serverProcess.pid);
        resolve();
      });
    });
  }  

  async initialize(){
    this.serverProcess = await this.startServer();
    this.client = this.createOscClient();
    process.on('exit',()=>{
      process.kill(-this.serverProcess.pid);
    });
  }

  async startServer(){
    return new Promise((resolve,reject) => {
      const p = spawn('sh',['./start_server.sh'],{detached:true});
      p.stdout.setEncoding('utf-8');
      const serverStarted = /Sonic Pi Server successfully booted/;
      p.stdout.on('data',function(data) {
        if(serverStarted.test(data)){
          resolve(p);
        }
        console.log(data.replace(/^/gm,"[SonicPi]\t"));
      });
    });
  }
}

module.exports = SonicPiClient;