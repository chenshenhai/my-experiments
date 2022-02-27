const net = require('net');
const {
  DESCRIPT_CMD,
  RESULT_CMD,
  ERROR_CMD,
  getMessageList,
  wrapperMessage,
} = require('./util');

class Server {
  constructor(opts) {
    this._opts = opts;
    this._funcMap = {};
    this._netConn = null;
    this._description = {};
    this._descrStr = wrapperMessage(DESCRIPT_CMD, this._description);
  }

  register(name, func) {
    this._description[name] = {};
    this._funcMap[name] = func;
  }

  close() {
    this._netConn?.close();
  }

  listen(callback) {
    if (this._netConn) {
      return;
    }
    this._netConn = net.createServer((connect) => {
      let buffObj = {
        bufferBytes: undefined,
        getLength: true,
        length: -1
      };

      connect.on('data', (data) => {
        if(buffObj.bufferBytes && buffObj.bufferBytes.length > 0){
          let tmpBuff = Buffer.from(buffObj.bufferBytes.length + data.length);
          buffObj.bufferBytes.copy(tmpBuff, 0);
          data.copy(tmpBuff, buffObj.bufferBytes.length);

          buffObj.bufferBytes = tmpBuff;
        } else {
          buffObj.bufferBytes = data;
        }

        let messages = getMessageList(buffObj);

        messages.forEach((msg) => {

          if(msg.name === DESCRIPT_CMD){
            this._descrStr = wrapperMessage(DESCRIPT_CMD, this._description);
            connect.write(this._descrStr);
          } else if(!this._funcMap[msg.name]){
            connect.write(wrapperMessage('error', {code: 'ERROR_UNKNOWN_MESSAGE'}));
          } else {
            try{
              const args = msg.data.args; 
              const result = this._funcMap[msg.name](...args);
              const resultMsg = wrapperMessage(RESULT_CMD, {id: msg.data.id, result: result, args: []});  
              connect.write(resultMsg);
            } catch(err){
              const resultMessage = wrapperMessage(ERROR_CMD, {id: msg.data.id, err: err});
              connect.write(resultMessage);
            }
          }
        });
      });

      connect.on('error', function(err){
        console.log(err);
      });
      
    });
    
    const { port, host } = this._opts;
    this._netConn.listen(port);
    callback();
  }
}


module.exports = {
  Server
}