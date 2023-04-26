import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Wallet } from "zksync-web3";
import fs from "fs";

export default async function deployZkSync(hre: HardhatRuntimeEnvironment, contractName: string, args: unknown[]) {
    console.log("Deploying zksync", contractName, "with args", args);
    const wallet = new Wallet(process.env.PRIVATE_KEY!);
    const deployer = new Deployer(hre, wallet);
    const artifact = await deployer.loadArtifact(contractName);
    const result = await deployer.deploy(artifact, args);
    console.log("Deployed zksync", contractName, "with address", result.address);

    // Exporting to a file
    if (!fs.existsSync(`${__dirname}/../deployments`)) {
        fs.mkdirSync(`${__dirname}/../deployments`);
    }
    if (!fs.existsSync(`${__dirname}/../deployments/${hre.network.name}`)) {
        fs.mkdirSync(`${__dirname}/../deployments/${hre.network.name}`);
    }
    fs.writeFileSync(
        `${__dirname}/../deployments/${hre.network.name}/${contractName}.json`,
        JSON.stringify(
            {
                address: result.address,
                args: args,
                abi: artifact.abi,
            },
            null,
            2,
        ),
    );
}
