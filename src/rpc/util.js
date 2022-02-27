const DESCRIPT_CMD = '___DESCRIPT___';
const RESULT_CMD = '___RESULT___';
const ERROR_CMD = '___ERROR___';
const LINE_FEED_CODE = '\n'.charCodeAt(0);

function uuid(a) {
  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).
  replace(/[018]/g, uuid);
}

function getBufferFirstLineFeedIndex(buf) {
  if(buf){
    for(let i = 0, l = buf.length; i < l; ++i){
      if(buf[i] === LINE_FEED_CODE){
        return i;
      }
    }
  }
  return -1;
}

function sliceBuffer(buf, length) {
  if(buf.length > length){
    return buf.slice(length);
  }
  return undefined;
}

function wrapperMessage(name, data){
  const msg = { name, data };
  const msgStr = JSON.stringify(msg);
  const msgLen = Buffer.byteLength(msgStr);
  return msgLen + '\n' + msgStr;
}

function getMessageList(buffObj) {
  const messages = [];
  let i = -1;

  const parseMessages = () => {
    if(buffObj.getLength === true){
      i = getBufferFirstLineFeedIndex(buffObj.bufferBytes);
      if(i > -1){
        buffObj.length = Number(buffObj.bufferBytes.slice(0, i).toString());
        buffObj.getLength = false;
        buffObj.bufferBytes = sliceBuffer(buffObj.bufferBytes, i + 1);
      }
    }

    if(buffObj.bufferBytes && buffObj.bufferBytes.length >= buffObj.length){
      let msg = buffObj.bufferBytes.slice(0, buffObj.length).toString();
      buffObj.getLength = true;
      
      let parsedMsg = JSON.parse(msg);
      messages.push(parsedMsg);
      buffObj.bufferBytes = sliceBuffer(buffObj.bufferBytes, buffObj.length);

      if(buffObj.bufferBytes && buffObj.bufferBytes.length > 0){
        parseCommands.call(getMessageList);
      }
    }
  };

  parseMessages.call(getMessageList);
  return messages;
}

class BufferUtil {
  constructor(buffObj = {
    bufferBytes: undefined,
    getLength: true,
    length: -1
  }) {
    this._buffObj = buffObj;
  }

  append(data) {
    const buffObj = this._buffObj;
    if(buffObj.bufferBytes && buffObj.bufferBytes.length > 0){
      let tmpBuff = Buffer.from(buffObj.bufferBytes.length + data.length);
      buffObj.bufferBytes.copy(tmpBuff, 0);
      data.copy(tmpBuff, buffObj.bufferBytes.length);

      buffObj.bufferBytes = tmpBuff;
    } else {
      buffObj.bufferBytes = data;
    }
  }
}

module.exports = {
  DESCRIPT_CMD,
  RESULT_CMD,
  ERROR_CMD,

  uuid,
  getBufferFirstLineFeedIndex,
  sliceBuffer,
  wrapperMessage,
  getMessageList,
  BufferUtil,
}