//声明是一个假模块
const fs = jest.genMockFromModule('fs')
//真正的fs
const _fs = jest.requireActual('fs') 
//右边复制到左边
Object.assign(fs,_fs)

const mocks = {}

fs.setMock = (path,error,data) =>{
  //只要读path，就返回这两个回调的参数
  mocks[path] = [error,data]
}

fs.readFile =(path,options,callback)=>{
  //防御性编程，防止用户不传callback
  if(callback === undefined){callback = options}
  //拦截
  if(path in mocks){
    callback(...mocks[path])
  }else{
    _fs.readFile(path,options,callback)
  }
}

module.exports = fs