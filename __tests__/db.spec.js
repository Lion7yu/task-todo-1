const db = require('../db.js')
const fs = require('fs')
jest.mock('fs')

describe('db',()=>{
  it('can read',async () =>{
    const data = [{title:'hi',done:'true'}]
    fs.setMock('/xxx',null,JSON.stringify(data))
    const list = await db.read('/xxx')
    //进行严格意义上的判断
    expect(list).toStrictEqual(data)
  })
})