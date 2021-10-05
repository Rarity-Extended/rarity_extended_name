/******************************************************************************
**	@Author:				Thomas Bouder <Tbouder>
**	@Email:					Tbouder@protonmail.com
**	@Date:					Sunday October 3rd 2021
**	@Filename:				deploy.js
******************************************************************************/

async function main() {
    //Compile
    await hre.run("clean");
    await hre.run("compile");

    //Deploy
    this.Contract = await ethers.getContractFactory("rarity_extended_name");
    this.Contract = await this.Contract.deploy();
    console.log("Deployed to:", this.Contract.address);


    await hre.run("verify:verify", {
		address: this.Contract.address,
		constructorArguments: [],
	});
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });