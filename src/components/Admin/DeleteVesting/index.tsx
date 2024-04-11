import {FC, FormEvent, useState} from "react";
import {ethers, Event} from "ethers";
import contracts from "../../../config/constants/contracts";
import {useRecoilValue} from "recoil";
import {walletAddressState} from "../../../store/wallet";
import Connector from "../../../containers/Connector";
import {getPropContractAddress, getStakingAddress} from "../../../utils/addressHelper";
import {getErc20Contract, getStakingContract, getVestingContract} from "../../../utils/contractHelper";
import {useConnectWallet} from "@web3-onboard/react";
import {toast} from "react-toastify";

type DeleteVestingSectionProps = {

}



const DeleteVesting:FC<DeleteVestingSectionProps> = () => {

    const walletAddress = useRecoilValue(walletAddressState);
    const { connectWallet } = Connector.useContainer();
    const [{ wallet }] = useConnectWallet();
    const { activeChainId } = Connector.useContainer();

    const [address, setAddress] = useState<string>("");
    const [pool, setPool] = useState<string>(contracts.vesting.seed.label);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if(wallet) {
            const pvd = new ethers.providers.Web3Provider(wallet.provider, 'any');
            const signer = pvd.getSigner();
            console.log(signer);
            const vestingContract = getVestingContract(activeChainId, pool, signer);
            console.log(walletAddress, vestingContract)
            const userProperties = await vestingContract.userPropertiesList(address);
            console.log(userProperties);
            if(!userProperties.isActive) {
                toast.error("Cannot delete user. User inactive");
                return;
            }

            setLoading(true);
            try {
                const tx = await vestingContract.removeVesting(userProperties.vestingId);
                await tx.wait();
                setAddress("");
                toast.success("Transaction succeeded");
            }catch(e)   {
                toast.error("Transaction failed");
            }finally{
                setLoading(false);
            }
        }
        console.log(address + " " + pool);
    }



    return(
        <>
            <div className={'delete-vesting-wrapper'}>
                <div className='delete-vesting h-100 d-flex justify-content-between align-items-center flex-column w-100' style={{ minHeight: 0, flex: 1 }}>
                    <div>
                        <div className='intro-title'>
                            Remove vesting
                        </div>
                        <div className={"disclaimer"}>
                            Remove a wallet from the selected vesting contract and delete its claim history. This allows to later attach a fresh vesting to the wallet.
                            This action executes a single blockchain transaction. Only eth address can be used.
                        </div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <select
                                onChange={(e) => setPool(e.target.value)}
                                className="w-100 margin-bottom-10"
                            >
                                {Object.entries(contracts.vesting).map(([key, value]) => <>
                                    <option
                                        value={value.label}
                                    >
                                        {value.label}
                                    </option>
                                </>)}
                            </select>
                            <label >
                                Address:
                            </label>
                            <input
                                type={'text'}
                                placeholder={'0x...'}
                                id={'address'}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-100 margin-bottom-10"
                                value={address.length > 0 ? address : ""}
                            />
                            {!walletAddress?
                                <button className='connect-wallet-button' onClick={() => connectWallet()}>
                                    <i className='pc-icon pc-icon-lock pc-icons-size-20 text-pri-300' />
                                    Connect Wallet
                                </button>
                                : <></>
                            }

                            {/* Stake button - show after wallet connected */
                                walletAddress && !loading?
                                    <button type={"submit"} className='button-primary button-lg'>
                                        Delete Vesting
                                    </button>
                                    : <></>
                            }

                            {/* Stake button - show after wallet connected */
                                walletAddress && loading?
                                    <button type={"submit"} className='button-primary button-lg' disabled={true}>
                                        Deleting...
                                    </button>
                                    : <></>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default DeleteVesting;