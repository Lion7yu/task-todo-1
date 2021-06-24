//声明是一个假模块
const fs = jest.genMockFromModule('fs')
//真正的fs
const _fs = jest.requireActual('fs') 
//右边复制到左边(浅拷贝)
Object.assign(fs,_fs)

let readMocks = {}

fs.setReadFileMock = (path,error,data) =>{
  //只要读path，就返回这两个回调的参数
  readMocks[path] = [error,data]
}

fs.readFile =(path,options,callback)=>{
  //防御性编程，防止用户不传callback
  if(callback === undefined){callback = options}
  //拦截
  if(path in readMocks){
    callback(...readMocks[path])
  }else{
    _fs.readFile(path,options,callback)
  }
}

let writeMocks = {}

fs.setWriteFileMock = (path,fn)=>{
  writeMocks[path] = fn
}

fs.writeFile = (path,data,options,callback)=>{
  //区别在于调用真实的fs，还是mock的fs
  if(path in writeMocks){
    writeMocks[path](path,data,options,callback)
  }else{
    _fs.writeFile(path,data,options,callback)
  }
}

fs.clearMocks = ()=>{
  readMocks = {}
  writeMocks = {}
}

module.exports = fs