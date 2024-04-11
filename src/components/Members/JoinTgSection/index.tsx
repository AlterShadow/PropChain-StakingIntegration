import { useCountdown } from "hooks/useCountdown";
import { ReactComponent as RightCaret } from "static/assets/Member/caret-right.svg";

const JoinTgSection = () => {
  const [days, hours, minutes, seconds] = useCountdown(new Date(`2023-09-14 12:00:00`).getTime())
  return(
    <div className='join-tg-section'>
      <div className='time-counter'>
        {`${days > 1 ? `${days}d`: ''}: ${hours}h : ${minutes}m : ${seconds}s`}
      </div>

      <div className='title-container'>
        <h1 className='title'>
          We are soon launching a special place for members
        </h1>

        <p className='desc'>
          Get special access to latest news and events, special member class staking and other special access areas. 
        </p>

        <button className='button-primary button-lg join-tg-button'>
          Join Telegram
          <RightCaret />
        </button>
      </div>
    </div>
  )
}
export default JoinTgSection;