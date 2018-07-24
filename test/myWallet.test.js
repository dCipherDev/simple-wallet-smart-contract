const myWallet = artifacts.require("myWallet");

contract('myWallet', function(accounts) {
	
  // Display the ballance for each address
  function printBalances(accounts) {
    accounts.forEach(function(ac, i) {
      console.log(i, web3.fromWei(web3.eth.getBalance(ac), 'ether').toNumber())
    })
  }
  
  // Setup a variable to hold the contract object.
  var mywallet

  // Display the innitial ballance account
  printBalances(accounts)
  // Create a test case for retreiving the deployed contract.
  it("Should retrive deployed contract.", function(done) {
    // Check if our instance has deployed
    myWallet.deployed().then(function(instance) {
      // Assign our contract instance for later use
      mywallet = instance
      console.log('new client', mywallet)  
      // Pass test if we have an object returned.
      assert.isOk(mywallet)
      // Tell Mocha move on to the next sequential test.
      done()
    })
  })
  
  it("Add address to the sender list", function(done) {
	  mywallet.addAddressToSenderLists("0xad24d48f97614733d926f842936015b672dd0438", 10000000000000000000, {from:accounts[0], to:mywallet.address,})
    .then(function(tx) {
      // Pass the test if we have a transaction reciept returned.
      assert.isOk(tx.receipt)
      // For convenience, show the balances of accounts after transaction.
      printBalances(accounts)
      done()
    }, function(error) {
        // Force an error if callback fails.
        assert.equal(true, false)
        console.error(error)
        done()
      })
  })
  
    it("Address added in the sender list by someone else", function(done) {
	  mywallet.addAddressToSenderLists("0xad24d48f97614733d926f842936015b672dd0438", 5000000000000000000, {from:accounts[1], to:mywallet.address,})
    .then(function(tx) {
      // Pass the test if we have a transaction reciept returned.
      assert.isOk(tx.receipt)
      // For convenience, show the balances of accounts after transaction.
      printBalances(accounts)
      done()
    }, function(error) {
        // Force an error if callback fails.
        assert.equal(true, false)
        console.error(error)
        done()
      })
  })
  
  it("Send funds", function(done) {
	  mywallet.sendFunds("0xad24d48f97614733d926f842936015b672dd0438", 5000000000000000000, {from:accounts[0], to:mywallet.address,})
    .then(function(tx) {
      // Pass the test if we have a transaction reciept returned.
      assert.isOk(tx.receipt)
      // For convenience, show the balances of accounts after transaction.
      printBalances(accounts)
      done()
    }, function(error) {
        // Force an error if callback fails.
        assert.equal(true, false)
        console.error(error)
        done()
      })
  }) 
/*  
  it("Send funds higher than is expected", function(done) {
	  mywallet.sendFunds("0xad24d48f97614733d926f842936015b672dd0438", 15000000000000000000, {from:accounts[0], to:mywallet.address,})
    .then(function(tx) {
      // Pass the test if we have a transaction reciept returned.
      assert.isOk(tx.receipt)
      // For convenience, show the balances of accounts after transaction.
      printBalances(accounts)
      done()
    }, function(error) {
        // Force an error if callback fails.
        assert.equal(true, false)
        console.error(error)
        done()
      })
  })
*/  
  it("Send the funds back to an address but not from owner side", function(done) {
	  mywallet.sendFunds("0xad24d48f97614733d926f842936015b672dd0438", 5000000000000000000, {from:accounts[1], to:mywallet.address,})
    .then(function(tx) {
      // Pass the test if we have a transaction reciept returned.
      assert.isOk(tx.receipt)
      // For convenience, show the balances of accounts after transaction.
      printBalances(accounts)
      done()
    }, function(error) {
        // Force an error if callback fails.
        assert.equal(true, false)
        console.error(error)
        done()
      })
  })
/*  
  it("should puts eth in balance", function(done) {
        mywallet.addMoneyInYourSmartContract()
    .then(function(tx) {
      // Pass the test if we have a transaction reciept returned.
      assert.isOk(tx.receipt)
      // For convenience, show the balances of accounts after transaction.
      printBalances(accounts)
      done()
    }, function(error) {
        // Force an error if callback fails.
        assert.equal(true, false)
        console.error(error)
        done()
      })
  })
  */
})