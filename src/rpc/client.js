const net = require('net');
const {
  DESCRIPT_CMD,
  RESULT_CMD,
  ERROR_CMD,
  getMessageList,
  wrapperMessage,
  uuid,
  BufferUtil
} = require('./util');


function parseRemoteFunc(msgName, callbacks, connection){

  return function(){
    const id = uuid();
  
    if(typeof arguments[arguments.length - 1] === 'function'){
      callbacks[id] = arguments[arguments.length - 1];
    } 

    let args = [];
    for(let ai = 0, al = arguments.length; ai < al; ++ai){
      if(typeof arguments[ai] !== 'function'){
        args.push(arguments[ai]);
      }
    }

    let msg = wrapperMessage(msgName, {id: id, args: args});
    connection.write(msg); 

    return  new Promise((resolve, reject) => {
      let buffObj = {
        bufferBytes: undefined,
        getLength: true,
        length: -1
      };
      const bufUtil = new BufferUtil(buffObj);

      const dataEvent = function(data){
        try {
          bufUtil.append(data)

          let messages = getMessageList(buffObj);
          messages.forEach(function(msg){
            connection.off('data', dataEvent)
            if(msg.name === RESULT_CMD && id === msg.data.id){
              resolve({
                result: msg.data.result,
                id: msg.data.id,
                funcName: msg.data.funcName,
                args: msg.data.args,
                error: null,
                success: true,
              });
            } 
          });
        } catch ( err ) {
          connection.off('data', dataEvent)
          resolve({
            data: null,
            err: err,
            success: false,
          });
        }
      }

      connection.on('data', dataEvent);
    });
    
  };
}

class Client {
  constructor(opts) {
    this._opts = opts;
    this._remoteFuncMap = null;
    this._netConn = null;
    this._callbacks = {};
  }

  connect() {
    return new Promise((resolve, reject) => {
      try {
        this._connectAction((remote, connect) => {
          this._remoteFuncMap = remote;
          this._netConn = connect;
          resolve();
        });
      } catch( err ) {
        reject(err);
      }
    });
  }

  _connectAction(callback) {
    const { port, host } = this._opts;
    let connection = net.createConnection(port, host);

    connection.setKeepAlive(true);

    connection.on('connect', function(){
      connection.write(wrapperMessage(DESCRIPT_CMD));
    });

    let buffObj = {
      bufferBytes: undefined,
      getLength: true,
      length: -1
    };
    const bufUtil = new BufferUtil(buffObj);

    connection.on('data', function(data){
      bufUtil.append(data);
      let messages = getMessageList(buffObj);

      messages.forEach((msg) => {
        if(msg.name === ERROR_CMD){
          if(this._callbacks[msg.data.id]){
            this._callbacks[msg.data.id].call(this, msg.data.err);
            delete this._callbacks[msg.data.id];
          }
        } else if(msg.name === DESCRIPT_CMD){
          let remoteObj = {};
          for(let p in msg.data){
            remoteObj[p] = parseRemoteFunc(p, this._callbacks, connection);
          }
          callback(remoteObj, connection);
        }
      });
    });

    connection.on('error', function(err){
      console.log(err);
    });

    connection.on('timeout', function(){
      console.log('Client connection timeout');
    });

    connection.on('end', function(){
      console.log('Client connection end');
    });
  }

  async call(name, args) {
    return await this._remoteFuncMap[name](...args);
  }

  close() {
    this._netConn.end();
    this._netConn.destroy();
  }
}


module.exports = {
  Client
}