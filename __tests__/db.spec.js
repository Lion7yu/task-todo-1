const db = require('../db.js')
const fs = require('fs')
jest.mock('fs')

describe('db',()=>{
  it('can read',async () =>{
    const data = [{title:'hi',done:'true'}]
    fs.setReadFileMock('/xxx',null,JSON.stringify(data))
    const list = await db.read('/xxx')
    //进行严格意义上的判断
    expect(list).toStrictEqual(data)
  })
  it('can write',async()=>{
    //声明一个假的文件
    let fakeFile 
    //写内容写在fakeFile里面
    fs.setWriteFileMock('/yyy',(path,data,callback)=>{
      fakeFile = data
      callback(null)
    })
    const list = [{title:'喝水',done:true},{title:'吃饭',done:true}]
    await db.write(list,'/yyy')
    expect(fakeFile).toBe(JSON.stringify(list)+'\n')
  })
})