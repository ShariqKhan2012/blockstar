const ContestFactoryContract = artifacts.require('../contracts/ContestCloneFactory.sol');
const ContestContract = artifacts.require('../contracts/Contest.sol');

const contestTitle = 'Indian Idol';
const contestDesc = 'A singing contest';
const feeInWei = 200000000000000;

const contestantName = 'John Doe';
const contestantDesc = 'Lorem Ipsum Dolor Set';
const videoId = 'mPZkdNFkNps';

let contestFactory;

beforeEach(async () => {
  contestFactory = await ContestFactoryContract.deployed();
})

contract("Contest creation test", accounts => {
  it('A contest can be sucessfully created', async () => {
    await contestFactory.createClone(contestTitle, contestDesc, feeInWei);
    const contests = await contestFactory.getContests();
    assert.equal(contests[0].title, contestTitle, "Titles don't match");

    /*
     * In the above block, we've been using a contract abstraction that 
     * has already been deployed. We used deployed() for this.
     * We can also deploy our own version to the network using the .new() function:
     * This block creates a NEW factory that is on a different address from the one
     * created using deploayed()
     */
    //let newContestFactory = await ContestFactoryContract.new();
    //const newContests = await newContestFactory.getContests();
    //console.log('newContestFactory => ', newContests);

    /*
     * If we already have an address for a contract, we can create 
     * a new abstraction to represent the contract at that address.
     * This block creates a duplicate factory that is on the SAME address
     * as the one created using deploayed()
     */
    //let duplicateContestFactory = await ContestFactoryContract.at(contestFactory.address);
    //const oldContests = await duplicateContestFactory.getContests();
    //console.log('oldContests => ', oldContests);

    /*
     * Let'suse the .at) method to get the created contest, since
     * we already have its address.
     */
    let firstContest = await ContestContract.at(contests[0].addr);
    let title = await firstContest.title();
    assert.equal(title, contestTitle, "Titles don't match");
  })
})


contract("Test if the running state of the contest can be changed", accounts => {
  it('Admin can stop a contest ', async () => {

  })
  it('Admin can pause a running contest ', async () => {

  })
  it('Admin can resume a paused contest ', async () => {

  })
  it('Non-admins can\'t change the running state of a contest ', async () => {

  })
})



contract("Test if the 'Participation Open' of the contest can be changed", accounts => {
  it('Admin can disable participation ', async () => {

  })
  it('Admin can\'t enable participation AFTER disabling once', async () => {

  })
})


contract("Participation tests", accounts => {
  it('Non-admin contestants can participate', async () => {
    await contestFactory.createClone(contestTitle, contestDesc, feeInWei);
    const contests = await contestFactory.getContests();
    const contest = await ContestContract.at(contests[0].addr);

    try {
      await contest.participate(web3.utils.padRight(web3.utils.asciiToHex(contestantName), 32), contestantDesc, videoId, {
        from: accounts[1],
        value: feeInWei,
      })
      assert.ok(true);
    }
    catch (e) {
      assert.ok(false);
    }
  })

  it('Admin can\'t participate', async () => {
    await contestFactory.createClone(contestTitle, contestDesc, feeInWei);
    const contests = await contestFactory.getContests();
    const contest = await ContestContract.at(contests[0].addr);

    try {
      await contest.participate(web3.utils.padRight(web3.utils.asciiToHex(contestantName), 32), contestantDesc, videoId, {
        from: accounts[0],
        value: feeInWei,
      })
      throw (false);
    }
    catch (e) {
      assert.ok(e);
    }
  })


  it('Contestants can\'t participate if contest is NOT running', async () => {

  })

  it('Contestants can\'t participate without required fee', async () => {

  })

  it('Contestants contestants can\'t participate if nickname is empty', async () => {

  })

  it('Contestants contestants can\'t participate if bio is empty', async () => {

  })

  it('Contestants contestants can\'t participate if video-id is empty', async () => {

  })

})

contract("Test full lifecycle", accounts => {
  beforeEach(async () => {
    contestFactory = await ContestFactoryContract.new();
  })

  /*
  it("Works okay with just 1 participant", async () => {
    await contestFactory.createClone(contestTitle, contestDesc, feeInWei);
    const contests = await contestFactory.getContests();
    const contest = await ContestContract.at(contests[0].addr);

    //Participate
    try {
      await contest.participate(web3.utils.padRight(web3.utils.asciiToHex(contestantName), 32), contestantDesc, videoId, {
        from: accounts[1],
        value: feeInWei,
      })
      assert.ok(true);
    }
    catch (e) {
      assert.ok(false);
    }

    //Disable Participation
    try {
      await contest.disableParticipation({
        from: accounts[0]
      })
      const winner = await contest.winner();
      console.log('Accounts and winner are =>', accounts, winner);
      assert.ok(true);
    }
    catch (e) {
      assert.ok(false)
    }
  })
  */

  /*
  it("Works okay with just 2 participants", async () => {
    await contestFactory.createClone(contestTitle, contestDesc, feeInWei);
    const contests = await contestFactory.getContests();
    const contest = await ContestContract.at(contests[0].addr);


    //1st Participant
    try {
      await contest.participate(web3.utils.padRight(web3.utils.asciiToHex(contestantName), 32), contestantDesc, videoId, {
        from: accounts[1],
        value: feeInWei,
      })
      assert.ok(true);
    }
    catch (e) {
      console.log("Caught =>", e)
      assert.ok(false);
    }

    //2st Participant
    try {
      await contest.participate(web3.utils.padRight(web3.utils.asciiToHex(contestantName), 32), contestantDesc, videoId, {
        from: accounts[2],
        value: feeInWei,
      })
      assert.ok(true);
    }
    catch (e) {
      assert.ok(false);
    }

    //Disable Participation
    try {
      await contest.disableParticipation({
        from: accounts[0]
      })
      assert.ok(true);
    }
    catch (e) {
      assert.ok(false)
    }

    //Start Voting
    for (j = 1; j < 4; j++) {
      const id = (j < 3) ? 1 : 2;
      try {
        await contest.vote(accounts[id], {
          from: accounts[9]
        })
        assert.ok(true);
      }
      catch (e) {
        console.log('Caught =>', e)
        assert.ok(false)
      }
    }

    //Close Voting
    try {
      await contest.closeVoting({
        from: accounts[0]
      })
      const winner = await contest.winner();
      console.log('Accounts and winners are =>', accounts, winner);
      assert.ok(true);
    }
    catch (e) {
      console.log('Caught =>', e)
      assert.ok(false)
    }

  })
  */

  /*
  it("Works okay with just 3 participants", async () => {
    await contestFactory.createClone(contestTitle, contestDesc, feeInWei);
    const contests = await contestFactory.getContests();
    const contest = await ContestContract.at(contests[0].addr);


    //1st Participant
    try {
      await contest.participate(web3.utils.padRight(web3.utils.asciiToHex(contestantName), 32), contestantDesc, videoId, {
        from: accounts[1],
        value: feeInWei,
      })
      assert.ok(true);
    }
    catch (e) {
      console.log("Caught =>", e)
      assert.ok(false);
    }

    //2st Participant
    try {
      await contest.participate(web3.utils.padRight(web3.utils.asciiToHex(contestantName), 32), contestantDesc, videoId, {
        from: accounts[2],
        value: feeInWei,
      })
      assert.ok(true);
    }
    catch (e) {
      assert.ok(false);
    }

    //3rd Participant
    try {
      await contest.participate(web3.utils.padRight(web3.utils.asciiToHex(contestantName), 32), contestantDesc, videoId, {
        from: accounts[3],
        value: feeInWei,
      })
      assert.ok(true);
    }
    catch (e) {
      assert.ok(false);
    }

    //Disable Participation
    try {
      await contest.disableParticipation({
        from: accounts[0]
      })
      assert.ok(true);
    }
    catch (e) {
      assert.ok(false)
    }

    let details = await contest.getContestDetails();
    let qualifiers = details[9];
    console.log('Audition qualifiers =>', qualifiers);
    for (i = 0; i < qualifiers[0].length - 1; i++) {
      //Open Voting
      console.log(`Enabling voting for round ${i}`);
      try {
        await contest.openVoting({
          from: accounts[0]
        })
        assert.ok(true);
      }
      catch (e) {
        console.log('Caught =>', e)
        assert.ok(false)
      }

      //Cast Votes for audition round
      let currentRound = await contest.currentRound();
      console.log(`Casting votes for round ${i}`);
      for (j = 0; j < qualifiers[currentRound].length; j++) {
        for (k = 0; k < 2 * (j + 1); k++) {
          try {
            await contest.vote(qualifiers[currentRound][j], {
              from: accounts[9]
            })
            assert.ok(true);
          }
          catch (e) {
            console.log('Caught =>', e)
            assert.ok(false)
          }
        }
      }

      //Close Voting
      console.log(`Closing voting for round ${i}`);
      try {
        await contest.closeVoting({
          from: accounts[0]
        })
        details = await contest.getContestDetails();
        qualifiers = details[9];
        console.log(`Round ${i} qualifiers =>`, qualifiers);
        assert.ok(true);
      }
      catch (e) {
        console.log('Caught =>', e)
        assert.ok(false)
      }
      console.log(`Voting closed for round ${i} and qualifers are`, qualifiers);
      const d1 = await contest.getContestantDetails(qualifiers[currentRound][0]);
      const d2 = await contest.getContestantDetails(qualifiers[currentRound][1]);

      console.log(`After closing voting for round ${i}, details are : `, d1[0].votesReceived, d2[0].votesReceived);
    }
    const winner = await contest.winner();
    console.log('Winner =>', winner)
  })
  */
  
for(n = 1; n <=7; n++ ) {
  it(`Works okay with N = ${n} participants`, async () => {
    await contestFactory.createClone(contestTitle, contestDesc, feeInWei);
    const contests = await contestFactory.getContests();
    const contest = await ContestContract.at(contests[0].addr);

    //const numContestants = n;

    //1st Participant
    for (count = 1; count <= n; count++) {
      try {
        await contest.participate(web3.utils.padRight(web3.utils.asciiToHex(contestantName), 32), contestantDesc, videoId, {
          from: accounts[count],
          value: feeInWei,
        })
        assert.ok(true);
      }
      catch (e) {
        console.log("Caught =>", e)
        assert.ok(false);
      }
    }


    //Disable Participation
    try {
      await contest.disableParticipation({
        from: accounts[0]
      })
      assert.ok(true);
    }
    catch (e) {
      assert.ok(false)
    }

    let details = await contest.getContestDetails();
    let qualifiers = details[9];
    console.log('Audition qualifiers =>', qualifiers);
    for (i = 0; i < qualifiers[0].length - 1; i++) {
      //Open Voting
      console.log(`Enabling voting for round ${i}`);
      try {
        await contest.openVoting({
          from: accounts[0]
        })
        assert.ok(true);
      }
      catch (e) {
        console.log('Caught =>', e)
        assert.ok(false)
      }

      //Cast Votes for audition round
      let currentRound = await contest.currentRound();
      console.log(`Casting votes for round ${i}`);
      for (j = 0; j < qualifiers[currentRound].length; j++) {
        for (k = 0; k < 2 * (j + 1); k++) {
          try {
            await contest.vote(qualifiers[currentRound][j], {
              from: accounts[9]
            })
            assert.ok(true);
          }
          catch (e) {
            console.log('Caught =>', e)
            assert.ok(false)
          }
        }
      }

      //Close Voting
      console.log(`Closing voting for round ${i}`);
      try {
        await contest.closeVoting({
          from: accounts[0]
        })
        details = await contest.getContestDetails();
        qualifiers = details[9];
        console.log(`Round ${i} qualifiers =>`, qualifiers);
        assert.ok(true);
      }
      catch (e) {
        console.log('Caught =>', e)
        assert.ok(false)
      }
      console.log(`Voting closed for round ${i} and qualifers are`, qualifiers);
      const d1 = await contest.getContestantDetails(qualifiers[currentRound][0]);
      const d2 = await contest.getContestantDetails(qualifiers[currentRound][1]);

      console.log(`After closing voting for round ${i}, details are : `, d1[0].votesReceived, d2[0].votesReceived);
    }
    const winner = await contest.winner();
    console.log('Winner =>', winner)

  })
}
})