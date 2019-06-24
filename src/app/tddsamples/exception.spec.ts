


class ExceptionThrower{
  doSmthng():void{
    throw "MyCustomException";
  }
}

describe('exception testin' , ()=>{
    let exceptionThrower = new ExceptionThrower();

    it('should thow exception when doSmthng called' , ()=>{
        try{
          exceptionThrower.doSmthng();
          fail("Test failed an exception should be raised");
        }catch (e) {
            expect(e).toBe("MyCustomException");
        }
    });


    it('A better approach to test' , ()=>{
       expect(()=> exceptionThrower.doSmthng())
         .toThrow("MyCustomException2");
    });
});
