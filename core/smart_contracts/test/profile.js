// const SimpleStorage = artifacts.require("./raedaMarketPlace.sol");

// contract("raedaMarketPLace", accounts => {
//   // it("...should store the value 89.", async () => {
//   //   const simpleStorageInstance = await SimpleStorage.deployed();

//   //   // Set value of 89
//   //   await simpleStorageInstance.set(89, { from: accounts[0] });

//   //   // Get stored value
//   //   const storedData = await simpleStorageInstance.get.call();

//   //   assert.equal(storedData, 89, "The value 89 was not stored.");
//   // });
// });

const profile = artifacts.require("./profile.sol");
const waterSource = artifacts.require("./waterSource.sol");


contract("tests",(accounts) =>{
    it("should make a profile", async () => {
        const profileInstance = await profile.deployed();
        response = await profileInstance.addProfile(1,'Thames','Supplier of rudders',{from:accounts[0]})
        setTimeout(()=>{},20000)
        // setTimeout(()=>{},20000)


        // assert.equal(ThamesProfile.userId,1,"UserId not 1");
        // assert.equal(ThamesProfile.waterType,1,"WaterType incorrect");
 
    });
    it("should have right name", async () => {
        const profileInstance = await profile.deployed();

        ThamesProfile = await profileInstance.profiles(1);
        
        
        assert.equal(ThamesProfile.userName,'Thames',"Username not correct");
    });
    it("should have right summary", async () => {
        const profileInstance = await profile.deployed();

        ThamesProfile = await profileInstance.profiles(1);
        
        console.log(ThamesProfile);
        assert.equal(ThamesProfile.summary,'Supplier of rudders',"Incorrect summary");

    });
    it("should have right EOA", async () => {
        const profileInstance = await profile.deployed();

        // ThamesProfile = await profileInstance.profiles(1);
        
        EOA_bool = await profileInstance.checkEOA(1,accounts[0]);
        assert(EOA_bool,"EOA not correct")   ;
    });
    it("should have right water TYPE", async () => {
        const profileInstance = await profile.deployed();

        ThamesProfile = await profileInstance.profiles(1);
        
        console.log(ThamesProfile);
        assert.equal(ThamesProfile.waterType.toString(),'1',"Incorrect watersource type");
    });
    it("should be able to add EOA", async () => {
        const profileInstance = await profile.deployed();

        // ThamesProfile = await profileInstance.profiles(1);
        
        await profileInstance.addEOA(1,accounts[1],{from:accounts[0]});
    });
    it("should have the additional EOA", async () => {
        const profileInstance = await profile.deployed();

        // ThamesProfile = await profileInstance.profiles(1);
        setTimeout(()=>{},20000)
        EOA_bool = await profileInstance.checkEOA(1,accounts[1]);
        console.log(EOA_bool);
        assert(EOA_bool,"EOA not correct");
    });
    it("should not have other additional EOA", async () => {
        const profileInstance = await profile.deployed();

        // ThamesProfile = await profileInstance.profiles(1);
        
        EOA_bool = await profileInstance.checkEOA(1,accounts[2]);
        assert(!EOA_bool,"EOA not correct");
    });
    it("should be able to make post", async () => {
        const profileInstance = await profile.deployed();
        const waterSourceInstance = await waterSource.deployed();

        // ThamesProfile = await profileInstance.profiles(1);
        response = await waterSourceInstance.initPost(1,12,'Oxford','London',200000,{from:accounts[0]})
        console.log(response)
    });
    it("should have right post information", async () => {
        const profileInstance = await profile.deployed();
        const waterSourceInstance = await waterSource.deployed();
        setTimeout(()=>{},20000)

        // ThamesProfile = await profileInstance.profiles(1);
        post = await waterSourceInstance.collection(1);
        console.log([post.userId.toString(),post.EOA,post.price.toString(),post.iX,post.fX,post.exp.toString(),post.live]);
        console.log(['1',accounts[0].toString(),'12','Oxford','London','200000',true])
        // assert([post.userId.toString(),post.EOA.toString(),post.price.toString(),post.iX,post.fX,post.exp.toString(),post.live]===['1',accounts[0].toString(),'12','Oxford','London','200000',true],"wrong info");
    });
    // it("should not be able to make post for wrong EOA", async () => {
    //     const profileInstance = await profile.deployed();
    //     const waterSourceInstance = await waterSource.deployed();

    //     // ThamesProfile = await profileInstance.profiles(1);
    //     assert.throws(async (waterSourceInstance)=>{await waterSourceInstance.initPost(1,13,'Sheffield','Manchester',12345,{from:accounts[2]})})
    //     // console.log(response)
    // });
    it("should be able to add to bucket", async () => {
        const profileInstance = await profile.deployed();
        const waterSourceInstance = await waterSource.deployed();

        // ThamesProfile = await profileInstance.profiles(1);
        await waterSourceInstance.addToBucket(1,'Volume',0,200,{from:accounts[0]});
        setTimeout(()=>{},20000);
    });
    it("should have right bucket data", async () => {
        const profileInstance = await profile.deployed();
        const waterSourceInstance = await waterSource.deployed();

        // ThamesProfile = await profileInstance.profiles(1);
        values = await waterSourceInstance.checkBucket(1,'Volume');
        assert.equal(values[0].toString(),'200');
    });
    // it("should be able to take down post", async () => {
    //     const profileInstance = await profile.deployed();
    //     const waterSourceInstance = await waterSource.deployed();

    //     await waterSourceInstance.takeDownPost
    // })


})