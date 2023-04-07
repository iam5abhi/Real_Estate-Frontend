import React,{useState, useEffect} from 'react'
import './Timer.css'

const Timer = ({endDate}) => {
    const [expiryTime, setExpiryTime] = useState();
   const [countdownTime, setCountdownTime]= useState(
       {
           countdownDays:'',
           countdownHours:'',
           countdownlMinutes:'',
           countdownSeconds:''
       }
   );
    const countdownTimer=()=>{
    
        const timeInterval= setInterval(() => {
          const countdownDateTime = new Date(expiryTime).getTime(); 
          const currentTime = new Date().getTime();
          const remainingDayTime = countdownDateTime - currentTime;
          const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
          const totalHours = Math.floor((remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const totalMinutes = Math.floor((remainingDayTime % (1000 * 60 * 60)) / (1000 * 60));
          const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);
     
          const runningCountdownTime={
             countdownDays: totalDays,
             countdownHours: totalHours,
             countdownlMinutes: totalMinutes,
             countdownSeconds: totalSeconds
          }
       
          setCountdownTime(runningCountdownTime);
     
          if (remainingDayTime < 0) {
             clearInterval(timeInterval);
             setExpiryTime(false);
            }
     
         }, 1000);
    }
     
    useEffect(() => {
        countdownTimer();
        setExpiryTime(endDate)
    });
  
    return (
        <>
          <div >
            <div>
              <mark className="sale animate-bounce hover:animate-none">Expire</mark>
            </div>
            <div className="countdown">
                <div>
                    <span className="number days" style={{"fontFamily":"cursive"}}>{countdownTime.countdownDays}</span>
                    <span className='day' style={{"fontFamily":"cursive"}}>Days</span>
                </div>
                <div>
                    <span className="number hours" style={{"fontFamily":"cursive"}}>{countdownTime.countdownHours}</span>
                    <span className='hour' style={{"fontFamily":"cursive"}}>Hours</span>
                </div>
                <div>
                    <span className="number minutes" style={{"fontFamily":"cursive"}} >{countdownTime.countdownlMinutes}</span>
                    <span className='minute' style={{"fontFamily":"cursive"}}>Minutes</span>
                </div>
                <div>
                    <span className="number seconds" style={{"fontFamily":"cursive"}} >{countdownTime.countdownSeconds}</span>
                    <span className='second' style={{"fontFamily":"cursive"}}>Seconds</span>
                </div>
            </div>
          </div>
        </>
    )
}

export default Timer