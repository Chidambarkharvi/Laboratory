const { TestWatcher } = require('jest')
const request = require('supertest')

const app = require('../app.js')

describe("POST/register", ()=>{
    test("OK, Registration is successfull", async ()=>{
        const res = await request(app)
                          .post('/register')
                          .send({
                            "name":"akshu",
                            "email":"sachink1@gmail.com",
                            "password":"sach",
                            "role":"User"
                          })
                    console.log(res);
                    expect(res.statusCode)
    },20000)
})

describe("POST/login",()=>{
   test("OK, Login is Successfull", async ()=>{
       const res = await request(app)
                        .post('/login')
                        .send({
                            "email":"manu@gmail.com",
                            "password":"qwerty",

                        })
                   console.log(res);
                   expect(res.statusCode)

   },20000)
})

describe("POST/user/details",()=>{
    var token= null;
    beforeEach((done)=>{
        request(app)
          .post('/login')
          .send({
            "email":"manu@gmail.com",
            "password":"qwerty"
          })
          .end((err,res)=>{
            //   token = res._body.token
              console.log(res);
              done()
          })
    },10000)

    test("OK, details getting done", async ()=>{
        const res = await request(app)
                          .get('/details')
                          .set("Authorization" , 'Bearer ' + token)
                    console.log(res);
                    expect(res.statusCode)
    },20000)
})