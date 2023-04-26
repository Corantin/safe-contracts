import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import deployZkSync from "../utils/deploy-zksync";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const { deploy } = deployments;

    if (hre.network.zksync) {
        await deployZkSync(hre, "TokenCallbackHandler", []);
        await deployZkSync(hre, "CompatibilityFallbackHandler", []);
    } else {
        await deploy("TokenCallbackHandler", {
            from: deployer,
            args: [],
            log: true,
            deterministicDeployment: true,
        });

        await deploy("CompatibilityFallbackHandler", {
            from: deployer,
            args: [],
            log: true,
            deterministicDeployment: true,
        });
    }
};

deploy.tags = ["handlers", "l2-suite", "main-suite"];
export default deploy;
