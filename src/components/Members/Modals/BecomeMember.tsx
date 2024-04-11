import { FC, useEffect, useState } from 'react';
import Cross from 'static/assets/Common/cross.png';
import useGetPoolData from 'hooks/staking/useGetPoolData';
import { formatNumberWithCommas } from 'utils/formatters/number';
import { DBMSignup } from 'api/news';
import { useRecoilState } from 'recoil';
import { walletAddressState } from 'store/wallet';
import Loader from 'components/Common/Loader';
import LongTermIcon from 'static/assets/Staking/long-term.svg';
import MidTermIcon from 'static/assets/Staking/mid-term.svg';
import Propc from 'static/assets/Member/proppc.svg';
import { useNavigate } from 'react-router-dom';
interface ModalProps {
    show: boolean;
    setModal: (show: boolean) => void;
    onSuccess: () => void;
}

const MINIMUM_LOCK = Number(process.env.REACT_APP_LOCK_AMOUNT || 1000);

type MemberForm = {
    username: string;
    locked_amount: number;
    email?: string;
};

const BecomeMemberModal: FC<ModalProps> = ({ show, setModal, onSuccess }) => {
    const [formdata, setFormData] = useState<MemberForm>({
        username: '',
        locked_amount: 0,
        email: '',
    });
    const navigate = useNavigate();
    const [formErr, setFormErr] = useState<string>();
    const { data, loaded } = useGetPoolData();
    const [sending, setSending] = useState<boolean>(false);
    const [walletAddress] = useRecoilState(walletAddressState);

    useEffect(() => {
        document.body.style.overflow = show ? 'hidden' : 'auto';
    }, [show]);
    const onSetFormValue = (key: keyof MemberForm, value: string | number) => {
        setFormData((data) => ({ ...data, [key]: value }));
    };

    const validateForm = () => {
        if (!formdata.username) {
            setFormErr('Please provide a username');
            return;
        }
        if (!formdata.email) {
            setFormErr('Please provide an email address');
            return;
        }
        setFormErr('');
        return true;
    };
    const continueDisabled = sending || !loaded;
    const shouldStakeMore = data.availablePROPC < MINIMUM_LOCK;
    const insufficientBalance = data.balance < MINIMUM_LOCK;
    const onSubmit = async () => {
        if (insufficientBalance) {
            setModal(false);
            return;
        }
        if (shouldStakeMore) {
            navigate('/staking');
            return;
        }
        try {
            const valid = validateForm();
            if (!valid) return;
            setSending(true);
            formdata.locked_amount = data.availablePROPC;
            await DBMSignup({
                ...formdata,
                wallet_address: walletAddress || '',
            });
            onSuccess();
        } catch (error) {
            const err: any = error;
            setFormErr(
                err?.message || 'Something went wrong, Please try again'
            );
            setSending(false);
        }
    };

    return (
        <div
            className={`modal-wrapper become-member-modal ${
                show ? 'show-modal' : ''
            }`}
        >
            <div className="modal-card" style={{ width: '600px' }}>
                <div className="d-flex justify-content-between w-100 align-items-center">
                    <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center justify-content-center icon-container bg-sec-100">
                            <i className="pc-icon pc-icon-rooms pc-icon-size-26 text-pri-100" />
                        </div>
                        <div className="modal-title text-pri-400 subheader-h5-500 subheader-mobile-h5-500">
                            {' '}
                            Become a Member{' '}
                        </div>
                    </div>
                    <button
                        className="close-button"
                        onClick={() => setModal(false)}
                    >
                        <img src={Cross} alt="" />
                    </button>
                </div>
                {formErr ? (
                    <label>
                        <span className="text-err-100 body-p-400 subheader-mobile-h6-400">
                            {formErr}
                        </span>
                    </label>
                ) : null}

                <div className="margin-top-40">
                    <label className="margin-bottom-8 subheader-h6-500 text-sec-400">
                        {' '}
                        Username{' '}
                    </label>
                    <input
                        required
                        name="username"
                        value={formdata.username}
                        onChange={(e) =>
                            onSetFormValue('username', e.target.value)
                        }
                        type="text"
                        className="w-100 margin-bottom-30"
                    />
                    <label className="margin-bottom-8 subheader-h6-500 text-sec-400">
                        {' '}
                        Your email {' '}
                    </label>
                    <input
                        type="email"
                        required
                        value={formdata.email}
                        onChange={(e) =>
                            onSetFormValue('email', e.target.value)
                        }
                        className="w-100 margin-bottom-30"
                    />

                    <div className="d-flex justify-content-between margin-bottom-8">
                        <label className="input-label subheader-h6-500 text-sec-400">
                            {' '}
                            Lock PROPC{' '}
                        </label>
                        <label className="text-end">
                            <span className="text-sec-300 subheader-h6-400 subheader-mobile-h6-400">
                                {' '}
                                Minimum to lock{' '}
                            </span>{' '}
                            &nbsp;
                            <span className="text-sec-400 subheader-h6-400">
                                {' '}
                                {formatNumberWithCommas(
                                    MINIMUM_LOCK
                                )} PROPC{' '}
                            </span>
                        </label>
                    </div>

                    {data.balance < MINIMUM_LOCK ? (
                        <div className="lock-section">
                            <div className="coin-icon-lg">
                                <img src={Propc} alt="mid term icon" />
                            </div>
                            <label className="text-white subheader-h2-400">
                                Buy $
                                <span className="subheader-h2-600">PROPC</span>
                                <br /> & Start Staking
                            </label>
                        </div>
                    ) : (
                        <div className="lock-section">
                            <div className="icon-cont long-term d-none d-md-flex">
                                <img src={LongTermIcon} alt="long term icon" />
                            </div>
                            <div className="icon-cont mid-term d-none d-md-flex">
                                <img src={MidTermIcon} alt="mid term icon" />
                            </div>
                            <label className="text-white body-md-400">
                                Stake
                                <span className="body-md-600">
                                    {' '}
                                    Long-Term
                                </span>{' '}
                                & <br />{' '}
                                <span className="body-md-600">
                                    Mid-Term
                                </span>{' '}
                                to Become a{' '}
                                <span className="body-md-600">
                                    Digital Board Member!
                                </span>{' '}
                            </label>
                        </div>
                    )}
                    {insufficientBalance ? null : (
                        <div className="d-flex w-100 margin-top-16">
                            <label className="text-end w-100">
                                <span className="text-sec-300 subheader-h6-400 subheader-mobile-h6-400">
                                    {' '}
                                    PROPC Locked{' '}
                                </span>{' '}
                                &nbsp;
                                <span className="text-sec-400 subheader-h6-400">
                                    {' '}
                                    {formatNumberWithCommas(
                                        data.availablePROPC
                                    )}{' '}
                                    PROPC{' '}
                                </span>
                            </label>
                        </div>
                    )}

                    <button
                        disabled={continueDisabled}
                        onClick={onSubmit}
                        className="button-primary w-100 margin-top-35"
                    >
                        {sending ? (
                            <Loader />
                        ) : insufficientBalance ? (
                            'Continue'
                        ) : shouldStakeMore ? (
                            'Stake'
                        ) : (
                            'Continue'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default BecomeMemberModal;
