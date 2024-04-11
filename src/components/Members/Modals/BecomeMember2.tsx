import { FC, useEffect, useState } from 'react';
import Cross from 'static/assets/Common/cross.png';
import useGetPoolData from 'hooks/staking/useGetPoolData';
// import { formatNumberWithCommas } from 'utils/formatters/number';
import { DBMSignup } from 'api/news';
import { useRecoilState } from 'recoil';
import { walletAddressState } from 'store/wallet';
import Loader from 'components/Common/Loader';
import LongTermIcon from 'static/assets/Staking/long-term.svg';
import MidTermIcon from 'static/assets/Staking/mid-term.svg';
import { useNavigate } from 'react-router-dom';
// import Propc from 'static/assets/Member/proppc.svg';
interface ModalProps {
    show: boolean;
    setModal: (show: boolean) => void;
    onSuccess: () => void;
}

const MINIMUM_LOCK = Number(process.env.REACT_APP_LOCK_AMOUNT || 1000);

type MemberForm = {
    locked_amount: number;
    email?: string;
    telegram?: string;
};

const BecomeMemberModal2: FC<ModalProps> = ({ show, setModal, onSuccess }) => {
    const [formdata, setFormData] = useState<MemberForm>({
        locked_amount: 0,
        email: '',
    });
   //  const navigate = useNavigate();
    const [formErr, setFormErr] = useState<string>();
    const { data, loaded } = useGetPoolData();
    const [sending, setSending] = useState<boolean>(false);
    const [walletAddress] = useRecoilState(walletAddressState);
    const [checked, setChecked] = useState<boolean>(false);
    const navigate = useNavigate();
    const shouldStakeMore = data.availablePROPC < MINIMUM_LOCK;
    useEffect(() => {
        document.body.style.overflow = show ? 'hidden' : 'auto';
    }, [show]);
    const onSetFormValue = (key: keyof MemberForm, value: string | number) => {
        setFormData((data) => ({ ...data, [key]: value }));
    };

    const validateForm = () => {
        if (!formdata.email) {
            setFormErr('Please provide an email address');
            return;
        }
        setFormErr('');
        return true;
    };
    const continueDisabled = sending || !loaded || !checked || !formdata.email;
    
    const onSubmit = async () => {
        if(shouldStakeMore){
            navigate('/staking');
            setModal(false);
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
        } finally{
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
                            Congratulations! You are eligible to join the
                            digital board members program
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
                        Your email{' '}
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
                    <label className="margin-bottom-8 subheader-h6-500 text-sec-400">
                        {' '}
                        Telegram (optional){' '}
                    </label>
                    <input
                        type="text"
                        required
                        value={formdata.telegram}
                        onChange={(e) =>
                            onSetFormValue('telegram', e.target.value)
                        }
                        className="w-100 margin-bottom-30"
                    />

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
                            </span> & <br />{' '}
                            <span className="body-md-600">Mid-Term</span> to
                            Become a{' '}
                            <span className="body-md-600">
                                Digital Board Member!
                            </span>{' '}
                        </label>
                    </div>
                    
                    <label className='d-flex align-items-center terms-check-label margin-top-35'>
                        <input
                            type='checkbox'
                            className='d-none terms-check-input'
                            onChange={(e) => setChecked(e.target.checked)}
                        />
                        <span className='terms-custom-check flex-shrink-0 margin-right-10 d-flex align-items-center justify-content-center text-pri-400'>
                            <i className="pc-icon pc-icon-check"></i>
                        </span>
                        <div className='text-pri-400'>
                            I agree to the Terms of Use of the <a href='https://files.prop.com/hubfs/Digital%20Board%20Members%20Program_Terms%20of%20Service%20(6).pdf' target='_blank' rel='noreferrer noopener' className='text-pri-400'> Digital Board Membership </a>
                        </div>
                    </label>
                    <button
                        disabled={continueDisabled}
                        onClick={onSubmit}
                        className="button-primary w-100 margin-top-35"
                    >
                        {sending ? (
                            <Loader />
                        ) : 
                           
                          shouldStakeMore ? "Stake" :  'Sign Up'
                      }
                    </button>
                </div>
            </div>
        </div>
    );
};
export default BecomeMemberModal2;
