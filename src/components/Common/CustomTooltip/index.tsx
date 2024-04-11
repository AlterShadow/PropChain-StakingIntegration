import { Tooltip } from 'react-tooltip';
import { ReactComponent as QuestionIcon } from "static/assets/Common/question.svg";

interface Props {
   tootlTipId: string;
   content : string;
}

const CustomTooltip : React.FC<Props> = ({ tootlTipId, content }) => {

   return(
      <>
         <a data-tooltip-id={tootlTipId} className='tooltip-icon-container d-inline-flex align-items-center'>
            <QuestionIcon />
         </a>
         <Tooltip 
            id={tootlTipId} 
            className='custom-tooltip'
            style={{ 
               maxWidth : "238px", 
               background: "rgba(24, 44, 86, 1)",
               boxShadow: "0px 4px 24px -1px #0000001F",
               fontFamily: "Archivo SemiExpanded",
               fontSize: "12px",
               fontWeight: "400",
               lineHeight: "16px",
               letterSpacing: "-0.015em",
               padding : "15px",
               paddingBottom : "0"
            }}
         >
            <p>{content}</p>
         </Tooltip>
      </>
   )
}
export default CustomTooltip;