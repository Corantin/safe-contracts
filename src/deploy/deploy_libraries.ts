import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import deployZkSync from "../utils/deploy-zksync";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, hardhatArguments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const { deploy } = deployments;

    if (hre.network.zksync) {
        await deployZkSync(hre, "CreateCall", []);
        await deployZkSync(hre, "MultiSend", []);
        await deployZkSync(hre, "MultiSendCallOnly", []);
        await deployZkSync(hre, "SignMessageLib", []);
    } else {
        await deploy("CreateCall", {
            from: deployer,
            args: [],
            log: true,
            deterministicDeployment: true,
        });

        await deploy("MultiSend", {
            from: deployer,
            args: [],
            log: true,
            deterministicDeployment: true,
        });

        await deploy("MultiSendCallOnly", {
            from: deployer,
            args: [],
            log: true,
            deterministicDeployment: true,
        });

        await deploy("SignMessageLib", {
            from: deployer,
            args: [],
            log: true,
            deterministicDeployment: true,
        });
    }
};

deploy.tags = ["libraries", "l2-suite", "main-suite"];
export default deploy;
