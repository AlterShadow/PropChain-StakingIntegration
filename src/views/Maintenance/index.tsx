import "./index.scss";
import Logo from "static/assets/SideNavbar/logo.svg"

const Maintenance = () => {

   return(
      <div className='maintenance-page position-relative'>
         <img src={Logo} alt='' className='logo' />
         <div className='card'>
            <div className='title'>Maintenance</div>
            <div className='desc'>
               We are currently in Scheduled maintenance mode. We will be back in a few hours. We apologize for any inconvenience caused, we are working to resume services as quickly as possible.
            </div>
         </div>
      </div>
   )
}
export default Maintenance;