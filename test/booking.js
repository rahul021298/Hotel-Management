// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let chaid = require('chaid');
// let server = require('../index');

// //Assertion Style
// chai.should();

// chai.use(chaiHttp);
// chai.use(chaid);

// describe('Booking API', () => {
//     /**
//      * Test the GET Route
//      */
//     describe("GET /booked/getAll", () => {
//         it("it should get all the booked rooms", (done) => {
//             chai.request(server)
//             .get("/booked/getAll")
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 // res.body.should.be.a('array');
//                 // res.body[0].should.have.property('name').and.to.be.a('object');
//                 // res.body[0].should.have.property('address').and.to.be.a('object');
//                 // res.body[0].should.have.property('userName').and.to.be.a('string');
//                 // res.body[0].should.have.property('phoneNumber').and.to.be.a('number');
//                 // res.body[0].should.have.property('age').and.to.be.a('number');
//                 // res.body[0].should.have.property('gender').and.to.be.a('string');
//                 // res.body[0].should.have.property('email').and.to.be.a('string');
//                 // res.body[0].should.have.property('password').and.to.be.a('string');
//                 // res.body[0].should.have.property('_id').and.to.be.a('string');
//             done();
//             })
//         })
//     })
//     /**
//      * Test the GET Route
//      */
//     // describe("POST /users/saveDetails", () => {
//     //     it("it should insert the user", (done) => {
//     //         const user ={
//     //                 "name":{
//     //                     "firstName":"Rahul",
//     //                     "lastName":"Makhija"
//     //                 },
//     //                 "userName":"raahulm",
//     //                 "password":"raahulm",
//     //                 "confirmPassword":"raahulm",
//     //                 "address":{
//     //                     "name":"Address",
//     //                     "city":"Mumbai",
//     //                     "state":"Maharashtra",
//     //                     "country":"INDIA"
//     //                  },
//     //                 "phoneNumber":9876543210,
//     //                 "email":"abc@email.com",
//     //                 "gender":"Male",
//     //                 "age":21
//     //         }
//     //         chai.request(server)
//     //         .post("/users/saveDetails")
//     //         .send(user)
//     //         .end((err, res) => {
//     //             res.should.have.status(200);
//     //             res.body.should.be.a('object');
//     //             res.body.user.should.be.a('object');
//     //         done();
//     //         })
//     //     })
//     // })  
// })