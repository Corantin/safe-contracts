import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import fs from "fs";

const contracts = {
    SimulateTxAccessor: "contracts/accessors/SimulateTxAccessor.sol:SimulateTxAccessor",
    CompatibilityFallbackHandler: "contracts/handler/CompatibilityFallbackHandler.sol:CompatibilityFallbackHandler",
    TokenCallbackHandler: "contracts/handler/TokenCallbackHandler.sol:TokenCallbackHandler",
    SafeProxyFactory: "contracts/proxies/SafeProxyFactory.sol:SafeProxyFactory",
    CreateCall: "contracts/libraries/CreateCall.sol:CreateCall",
    MultiSend: "contracts/libraries/MultiSend.sol:MultiSend",
    MultiSendCallOnly: "contracts/libraries/MultiSendCallOnly.sol:MultiSendCallOnly",
    SignMessageLib: "contracts/libraries/SignMessageLib.sol:SignMessageLib",
    Safe: "contracts/Safe.sol:Safe",
    SafeL2: "contracts/SafeL2.sol:SafeL2",
};

task("deploy-contracts", "Deploys and verifies Safe contracts").setAction(async (_, hre) => {
    // console.log("Deploying contracts");
    // await hre.run("deploy");
    // console.log("Local contracts verification");
    // await hre.run("local-verify");
    // console.log("Souricing contracts");
    // await hre.run("sourcify");
    if (hre.network.zksync) {
        for (const contractName of Object.keys(contracts)) {
            try {
                const fullyQualifiedContractName = contracts[contractName];
                const contractJson: { abi: unknown; address: string; args: unknown[] } = JSON.parse(
                    fs.readFileSync(`${__dirname}/../deployments/${hre.network.name}/${contractName}.json`, "utf8"),
                );
                console.log("Verifying", contractName, "with address", contractJson.address);
                await hre.run("verify:verify", {
                    address: contractJson.address,
                    contract: fullyQualifiedContractName,
                    constructorArguments: contractJson.args,
                });
                console.log("Verified", contractName, "with address", contractJson.address);
            } catch (error) {
                console.error("Error verifying", contractName, error);
            }
        }
    } else {
        await hre.run("etherscan-verify", { forceLicense: true, license: "LGPL-3.0" });
    }
});

export {};
