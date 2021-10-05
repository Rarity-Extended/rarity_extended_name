// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface IRarity {
    function isApprovedForAll(address owner, address operator) external view returns (bool);
    function getApproved(uint256 tokenId) external view returns (address);
    function ownerOf(uint _summoner) external view returns (address);
}

contract rarity_extended_name {
    IRarity constant _rm = IRarity(0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb);
    string constant public name = "Rarity Extended Name";
    mapping(uint => string[3]) private adventurers_name;

    /**
    **  @dev Check if the msg.sender has the autorization to act on this adventurer
    **	@param _adventurer: TokenID of the adventurer we want to check
    **/
    function _isApprovedOrOwner(uint _adventurer) internal view returns (bool) {
        return (_rm.getApproved(_adventurer) == msg.sender || _rm.ownerOf(_adventurer) == msg.sender || _rm.isApprovedForAll(_rm.ownerOf(_adventurer), msg.sender));
    }

    /**
    **  @dev set the name of an adventurer
    **  @param _adventurer tokenID of the adventurer to assign a name to
    **  @param _firstname firstname to assign to this adventurer
    **  @param _lastname lastname to assign to this adventurer
    **  @param _surname surname to assign to this adventurer
    */
    function set_name(uint _adventurer, string memory _firstname, string memory _lastname, string memory _surname) external {
        require(_isApprovedOrOwner(_adventurer));
        adventurers_name[_adventurer] = [_firstname, _lastname, _surname];
    }

    /**
    **  @dev set the firstname of an adventurer
    **  @param _adventurer tokenID of the adventurer to assign a firstname to
    **  @param _firstname firstname to assign to this adventurer
    */
    function set_firstname(uint _adventurer, string memory _firstname) external {
        require(_isApprovedOrOwner(_adventurer));
        adventurers_name[_adventurer][0] = _firstname;
    }

    /**
    **  @dev set the lastname of an adventurer
    **  @param _adventurer tokenID of the adventurer to assign a lastname to
    **  @param _lastname lastname to assign to this adventurer
    */
    function set_lastname(uint _adventurer, string memory _lastname) external {
        require(_isApprovedOrOwner(_adventurer));
        adventurers_name[_adventurer][1] = _lastname;
    }

    /**
    **  @dev set the surname of an adventurer
    **  @param _adventurer tokenID of the adventurer to assign a surname to
    **  @param _surname surname to assign to this adventurer
    */
    function set_surname(uint _adventurer, string memory _surname) external {
        require(_isApprovedOrOwner(_adventurer));
        adventurers_name[_adventurer][2] = _surname;
    }
    
    /**
    **  @dev get the different parts of the name of the adventurer
    **  @param _adventurer tokenID of the adventurer to get name of
    */
    function get_name(uint _adventurer) public view returns (string memory, string memory, string memory) {
        return (adventurers_name[_adventurer][0], adventurers_name[_adventurer][1], adventurers_name[_adventurer][2]);
    }
}