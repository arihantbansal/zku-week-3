// [assignment] write your own unit test to show that your Mastermind variation circuit is working as expected

const { expect, assert } = require("chai");
const wasm_tester = require("circom_tester").wasm;
const { buildPoseidon } = require("circomlibjs");

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;

exports.p = Scalar.fromString(
	"21888242871839275222246405745257275088548364400416034343698204186575808495617"
);
const Fr = new F1Field(exports.p);

const poseidonHash = async (items) => {
	let poseidon = await buildPoseidon();
	return poseidon.F.toObject(poseidon(items));
};

const circuitPath = "contracts/circuits/MastermindVariation.circom";

describe("MastermindVariation", () => {
	const salt = 123456;
	const solution = [1, 2, 3];
	let solnHash;

	beforeEach(async () => {
		solnHash = await poseidonHash([salt, ...solution]);
	});

	it("circuit returns correct hash w/ input: 3 hits x 0 blow", async () => {
		const circuit = await wasm_tester(circuitPath);

		const INPUT = {
			privSolnA: solution[0],
			privSolnB: solution[1],
			privSolnC: solution[2],
			privSalt: salt,
			pubGuessA: 1,
			pubGuessB: 2,
			pubGuessC: 3,
			pubNumHit: 3,
			pubNumBlow: 0,
			pubSolnHash: solnHash,
		};
		const witness = await circuit.calculateWitness(INPUT, true);

		assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
		assert(Fr.eq(Fr.e(witness[1]), Fr.e(solnHash)));
	});

	it("circuit returns correct hash with valid input: 2 hits x 0 blow", async () => {
		const circuit = await wasm_tester(circuitPath);

		const INPUT = {
			privSolnA: solution[0],
			privSolnB: solution[1],
			privSolnC: solution[2],
			privSalt: salt,
			pubGuessA: 1,
			pubGuessB: 2,
			pubGuessC: 4,
			pubNumHit: 2,
			pubNumBlow: 0,
			pubSolnHash: solnHash,
		};
		const witness = await circuit.calculateWitness(INPUT, true);

		assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
		assert(Fr.eq(Fr.e(witness[1]), Fr.e(solnHash)));
	});

	it("circuit returns correct hash with valid input: 1 hit x 1 blow", async () => {
		const circuit = await wasm_tester(circuitPath);

		const INPUT = {
			privSolnA: solution[0],
			privSolnB: solution[1],
			privSolnC: solution[2],
			privSalt: salt,
			pubGuessA: 1,
			pubGuessB: 3,
			pubGuessC: 4,
			pubNumHit: 1,
			pubNumBlow: 1,
			pubSolnHash: solnHash,
		};
		const witness = await circuit.calculateWitness(INPUT, true);

		assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
		assert(Fr.eq(Fr.e(witness[1]), Fr.e(solnHash)));
	});

	it("circuit returns correct hash with valid input: 1 hit x 2 blows", async () => {
		const circuit = await wasm_tester(circuitPath);

		const INPUT = {
			privSolnA: solution[0],
			privSolnB: solution[1],
			privSolnC: solution[2],
			privSalt: salt,
			pubGuessA: 1,
			pubGuessB: 3,
			pubGuessC: 2,
			pubNumHit: 1,
			pubNumBlow: 2,
			pubSolnHash: solnHash,
		};
		const witness = await circuit.calculateWitness(INPUT, true);

		assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
		assert(Fr.eq(Fr.e(witness[1]), Fr.e(solnHash)));
	});

	it("circuit returns correct hash with valid input: 0 hit x 3 blows", async () => {
		const circuit = await wasm_tester(circuitPath);

		const INPUT = {
			privSolnA: solution[0],
			privSolnB: solution[1],
			privSolnC: solution[2],
			privSalt: salt,
			pubGuessA: 2,
			pubGuessB: 3,
			pubGuessC: 1,
			pubNumHit: 0,
			pubNumBlow: 3,
			pubSolnHash: solnHash,
		};
		const witness = await circuit.calculateWitness(INPUT, true);

		assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
		assert(Fr.eq(Fr.e(witness[1]), Fr.e(solnHash)));
	});

	it("circuit returns correct hash with valid input: 0 hit x 2 blows", async () => {
		const circuit = await wasm_tester(circuitPath);

		const INPUT = {
			privSolnA: solution[0],
			privSolnB: solution[1],
			privSolnC: solution[2],
			privSalt: salt,
			pubGuessA: 2,
			pubGuessB: 3,
			pubGuessC: 4,
			pubNumHit: 0,
			pubNumBlow: 2,
			pubSolnHash: solnHash,
		};
		const witness = await circuit.calculateWitness(INPUT, true);

		assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
		assert(Fr.eq(Fr.e(witness[1]), Fr.e(solnHash)));
	});

	it("circuit returns correct hash with valid input: 0 hit x 1 blows", async () => {
		const circuit = await wasm_tester(circuitPath);

		const INPUT = {
			privSolnA: solution[0],
			privSolnB: solution[1],
			privSolnC: solution[2],
			privSalt: salt,
			pubGuessA: 2,
			pubGuessB: 5,
			pubGuessC: 4,
			pubNumHit: 0,
			pubNumBlow: 1,
			pubSolnHash: solnHash,
		};
		const witness = await circuit.calculateWitness(INPUT, true);

		assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
		assert(Fr.eq(Fr.e(witness[1]), Fr.e(solnHash)));
	});

	it("circuit returns correct hash with valid input: 0 hit x 0 blows", async () => {
		const circuit = await wasm_tester(circuitPath);

		const INPUT = {
			privSolnA: solution[0],
			privSolnB: solution[1],
			privSolnC: solution[2],
			privSalt: salt,
			pubGuessA: 6,
			pubGuessB: 5,
			pubGuessC: 4,
			pubNumHit: 0,
			pubNumBlow: 0,
			pubSolnHash: solnHash,
		};
		const witness = await circuit.calculateWitness(INPUT, true);

		assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
		assert(Fr.eq(Fr.e(witness[1]), Fr.e(solnHash)));
	});

	it("circuit throws error when guesses are duplicate", async () => {
		const circuit = await wasm_tester(circuitPath);

		const INPUT = {
			privSolnA: solution[0],
			privSolnB: solution[1],
			privSolnC: solution[2],
			privSalt: salt,
			pubGuessA: 1,
			pubGuessB: 2,
			pubGuessC: 2,
			pubNumHit: 2,
			pubNumBlow: 1,
			pubSolnHash: solnHash,
		};
		expect(circuit.calculateWitness(INPUT, true)).to.be.revertedWith(Error);
	});

	it("circuit throws error when some digits are more than 10", async () => {
		const circuit = await wasm_tester(circuitPath);

		const INPUT = {
			privSolnA: solution[0],
			privSolnB: solution[1],
			privSolnC: solution[2],
			privSalt: salt,
			pubGuessA: 1,
			pubGuessB: 2,
			pubGuessC: 11,
			pubNumHit: 2,
			pubNumBlow: 0,
			pubSolnHash: solnHash,
		};
		expect(circuit.calculateWitness(INPUT, true)).to.be.revertedWith(Error);
	});

	it("circuit throws error when some digits are less than 0", async () => {
		const circuit = await wasm_tester(circuitPath);

		const INPUT = {
			privSolnA: solution[0],
			privSolnB: solution[1],
			privSolnC: solution[2],
			privSalt: salt,
			pubGuessA: 1,
			pubGuessB: 2,
			pubGuessC: -1,
			pubNumHit: 2,
			pubNumBlow: 0,
			pubSolnHash: solnHash,
		};
		expect(circuit.calculateWitness(INPUT, true)).to.be.revertedWith(Error);
	});

	it("circuit throws error with when incorrect hits", async () => {
		const circuit = await wasm_tester(circuitPath);

		const INPUT = {
			privSolnA: solution[0],
			privSolnB: solution[1],
			privSolnC: solution[2],
			privSalt: salt,
			pubGuessA: 1,
			pubGuessB: 2,
			pubGuessC: 4,
			pubNumHit: 3,
			pubNumBlow: 0,
			pubSolnHash: solnHash,
		};
		expect(circuit.calculateWitness(INPUT, true)).to.be.revertedWith(Error);
	});

	it("circuit throws error with when incorrect blows", async () => {
		const circuit = await wasm_tester(circuitPath);

		const INPUT = {
			privSolnA: solution[0],
			privSolnB: solution[1],
			privSolnC: solution[2],
			privSalt: salt,
			pubGuessA: 1,
			pubGuessB: 2,
			pubGuessC: 4,
			pubNumHit: 2,
			pubNumBlow: 1,
			pubSolnHash: solnHash,
		};
		expect(circuit.calculateWitness(INPUT, true)).to.be.revertedWith(Error);
	});
});
