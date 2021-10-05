require("dotenv").config();
const { expect, use } = require('chai');
const { solidity } = require('ethereum-waffle');
const { deployments, ethers } = require('hardhat');
const RarityExtendedName = artifacts.require("rarity_extended_name");

use(solidity);

const	RARITY_ADDRESS = '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb'
let		RARITY;

describe('Tests', () => {
	let		rarityExtendedName;
    let		user;
	let		adventurerPool = [];

    before(async () => {
        await deployments.fixture();
        [user, anotherUser] = await ethers.getSigners();
		RARITY = new ethers.Contract(RARITY_ADDRESS, [
			'function next_summoner() public view returns (uint)',
			'function summon(uint _class) external',
			'function setApprovalForAll(address operator, bool _approved) external',
		], user);
		rarityExtendedName = await RarityExtendedName.new()
    });

	
	it('should be possible to get the name of the contract', async function() {
		const	name = await rarityExtendedName.name();
		await	expect(name).to.be.equal('Rarity Extended Name');
	})

	it('should be possible to summon 4 adventurers', async function() {
		for (let index = 1; index < 5; index++) {
			const	nextAdventurer = Number(await RARITY.next_summoner());
			await	(await RARITY.summon(index)).wait();
			adventurerPool.push(nextAdventurer);	
		}
	})

	it('should be possible to set_name', async function() {
		await expect(rarityExtendedName.set_name(adventurerPool[0], 'John', 'Doe', 'The Unknown', {from: user.address})).not.to.be.reverted;
	})
	it('should be possible to set_firstname', async function() {
		await expect(rarityExtendedName.set_firstname(adventurerPool[1], 'Jane', {from: user.address})).not.to.be.reverted;
	})
	it('should be possible to set_lastname', async function() {
		await expect(rarityExtendedName.set_lastname(adventurerPool[2], 'Deaa', {from: user.address})).not.to.be.reverted;
	})
	it('should be possible to set_surname', async function() {
		await expect(rarityExtendedName.set_surname(adventurerPool[3], 'Unname', {from: user.address})).not.to.be.reverted;
	})
	
	it('should be possible to get the name of Adventurer 1', async function() {
		const	names = await rarityExtendedName.get_name(adventurerPool[0]);
		expect(names[0]).to.be.equal('John');
		expect(names[1]).to.be.equal('Doe');
		expect(names[2]).to.be.equal('The Unknown');
	})
	it('should be possible to get the name of Adventurer 2', async function() {
		const	names = await rarityExtendedName.get_name(adventurerPool[1]);
		expect(names[0]).to.be.equal('Jane');
		expect(names[1]).to.be.equal('');
		expect(names[2]).to.be.equal('');
	})
	it('should be possible to get the name of Adventurer 3', async function() {
		const	names = await rarityExtendedName.get_name(adventurerPool[2]);
		expect(names[0]).to.be.equal('');
		expect(names[1]).to.be.equal('Deaa');
		expect(names[2]).to.be.equal('');
	})
	it('should be possible to get the name of Adventurer 4', async function() {
		const	names = await rarityExtendedName.get_name(adventurerPool[3]);
		expect(names[0]).to.be.equal('');
		expect(names[1]).to.be.equal('');
		expect(names[2]).to.be.equal('Unname');
	})
});