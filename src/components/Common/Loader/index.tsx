import "./index.scss";

interface LoaderProps {
  bgColor?: String
}

const Loader: React.FC<LoaderProps> =  ({bgColor}) => {

   return(
      <div className={`loader-1 center ${bgColor ? bgColor : ''}`}><span></span></div>
   )
}
export default Loader;