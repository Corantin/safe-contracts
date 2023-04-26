import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import deployZkSync from "../utils/deploy-zksync";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const { deploy } = deployments;

    if (hre.network.zksync) {
        await deployZkSync(hre, "SafeL2", []);
    } else {
        await deploy("SafeL2", {
            from: deployer,
            args: [],
            log: true,
            deterministicDeployment: true,
        });
    }
};

deploy.tags = ["l2", "l2-suite"];
export default deploy;
