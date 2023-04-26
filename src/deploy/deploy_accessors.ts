import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import deployZkSync from "../utils/deploy-zksync";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const { deploy } = deployments;

    if (hre.network.zksync) {
        await deployZkSync(hre, "SimulateTxAccessor", []);
    } else {
        await deploy("SimulateTxAccessor", {
            from: deployer,
            args: [],
            log: true,
            deterministicDeployment: true,
        });
    }
};

deploy.tags = ["accessors", "l2-suite", "main-suite"];
export default deploy;
