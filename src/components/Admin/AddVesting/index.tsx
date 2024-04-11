import {FC, FormEvent, useState} from "react";
import {BigNumber, ethers, Event} from "ethers";
import contracts from "../../../config/constants/contracts";
import {useRecoilValue} from "recoil";
import {walletAddressState} from "../../../store/wallet";
import Connector from "../../../containers/Connector";
import {getVestingContract} from "../../../utils/contractHelper";
import {useConnectWallet} from "@web3-onboard/react";
import {toast} from "react-toastify";
import moment from "moment";

type AddVestingSectionProps = {

}



const AddVesting:FC<AddVestingSectionProps> = () => {

    const walletAddress = useRecoilValue(walletAddressState);
    const { connectWallet } = Connector.useContainer();
    const [{ wallet }] = useConnectWallet();
    const { activeChainId } = Connector.useContainer();

    const [address, setAddress] = useState<string>("");
    const [tgePercentage, setTgePercentage] = useState<number>(0);
    const [payouts, setPayouts] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [tgeAmount, setTgeAmount] = useState<number>(0);
    const [startDate, setStartDate] = useState<number>(0);
    const [pool, setPool] = useState<string>(contracts.vesting.seed.label);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingStep, setLoadingStep] = useState<number>(0);

    const [vestingAddEnabled, setVestingAddEnabled] = useState<boolean>(false);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if(wallet) {
            const pvd = new ethers.providers.Web3Provider(wallet.provider, 'any');
            const signer = pvd.getSigner();
            const vestingContract = getVestingContract(activeChainId, pool, signer);

            const userProperties = await vestingContract.userPropertiesList(address);
            if(userProperties.isActive) {
                toast.error("User is active on pool");
                return;
            }

            const vestingsCount = await vestingContract._vestingCount();
            const vestings = [];
            vestings.push({
                amountForUser: ethers.utils.parseUnits(totalAmount.toString(), 'ether'),
                tgeAmountForUser: ethers.utils.parseUnits(tgeAmount.toString(), 'ether'),
                startTime: ethers.BigNumber.from(startDate.toString()),
                tickCount: payouts.toString(),
                tickDuration: "86400", // one day
                unallocatedAmount: ethers.utils.parseUnits(totalAmount.toString(), 'ether'),
                active: true
            })

            setLoading(true);
            setLoadingStep(1);

            const createVestingTx = await vestingContract.insertVestingList(vestings);
            if (!createVestingTx.hash) {
                toast.error("Could not create vesting (missing hash)");
                return;
            }
            const createVestingReceipt = await createVestingTx.wait();
            if (!createVestingReceipt.status) {
                toast.error("Could not create vesting (missing status)");
                return;
            }

            setLoadingStep(2);
            const addWalletTx = await vestingContract.insertWalletListToVesting([vestingsCount], [address])
            if (!addWalletTx.hash) {
                toast.error("Could not add user (missing hash)");
                return;
            }
            const addWalletReceipt = await addWalletTx.wait();
            if (!addWalletReceipt.status) {
                toast.error("Could not add user (missing status)")
                return;
            }
            toast.success(`Added vesting for ${address}`);

            setLoading(false);
            setLoadingStep(0);
        }
    }

    function handleChange(field: string, value: any) {
        switch(field)   {
            case 'address': setAddress(value); break;
            case 'tge':
                setTgePercentage(value);
                setTgeAmount(tgeEther(totalAmount, value));
                break;
            case 'payouts': setPayouts(value); break;
            case 'total':
                setTotalAmount(value);
                setTgeAmount(tgeEther(value, tgePercentage));
                break;
            case 'start': let date = moment(value + "T12:00:00Z").unix(); setStartDate(date); break;
        }

        if(address && tgeAmount && payouts && totalAmount > 0 && startDate)
            setVestingAddEnabled(true);
    }

    function tgeEther(amount : number, percentage : number) {
        if(percentage > 100) {
            toast.error("Exceeding 100% for TGE");
            setVestingAddEnabled(false);
        }
        let perBill = Math.trunc(percentage * 100); // account for up to 2 decimals on percentage, e.g. input 10.43%
        return Math.trunc((amount * perBill) / 10_000);
    }

    return(
        <>
            <div className={'add-vesting-wrapper'}>
                <div className='add-vesting h-100 d-flex justify-content-between align-items-center flex-column w-100' style={{ minHeight: 0, flex: 1 }}>
                    <div>
                        <div className='intro-title'>
                            Add vesting
                        </div>
                        <div className={"disclaimer"}>
                            Add a single wallet to the vesting bucket. All amounts are in ETH (i.e. 1 = 1 PROPC).
                            This action executes two consecutive blockchain transactions. Only eth address can be used.
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
                                id={'address'} onChange={(e) => handleChange('address', e.target.value)}
                                className="w-100 margin-bottom-10"
                            />
                            <label >
                                TGE:
                            </label>
                            <input
                                type={'number'}
                                placeholder={'0'}
                                id={'address'} onChange={(e) => handleChange('tge', e.target.value)}
                                className="w-100 margin-bottom-10"
                            />
                            <label >
                                Payouts:
                            </label>
                            <input
                                type={'number'}
                                placeholder={'30'}
                                id={'address'} onChange={(e) => handleChange('payouts', e.target.value)}
                                className="w-100 margin-bottom-10"
                            />
                            <label >
                                Total amount:
                            </label>
                            <input
                                type={'number'}
                                placeholder={'30000'}
                                id={'address'} onChange={(e) => handleChange('total', e.target.value)}
                                className="w-100 margin-bottom-10"
                            />
                            <label >
                                Start Date:
                            </label>
                            <input
                                type={'date'}
                                placeholder={'30000'}
                                id={'address'} onChange={(e) => handleChange('start', e.target.value)}
                                className="w-100 margin-bottom-10"
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
                                    <button type={"submit"} className='button-primary button-lg' disabled={!vestingAddEnabled}>
                                        Add Vesting
                                    </button>
                                    : <></>
                            }

                            {/* Stake button - show after wallet connected */
                                walletAddress && loading && loadingStep == 1 ?
                                    <button type={"submit"} className='button-primary button-lg' disabled={true}>
                                        Creating vesting schedule ...
                                    </button>
                                    : <></>
                            }

                            {/* Stake button - show after wallet connected */
                                walletAddress && loading && loadingStep == 2 ?
                                    <button type={"submit"} className='button-primary button-lg' disabled={true}>
                                        Attaching wallet to schedule ...
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

export default AddVesting;