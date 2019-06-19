


describe('test lifecycle' , ()=>{


  beforeAll(()=>{
    console.log("before all");
  });


  beforeEach(()=>{
    console.log("before Each");
  });

  afterAll(()=>console.log("after all"));
  afterEach(()=>console.log("after each"));

  it('should not fail' , ()=>{
    console.log("1");
  });
  it('should not fail 2' , ()=>{
    console.log("2");
  });
  it('should not fail 3' , ()=>{
    console.log("3");
  });
});
