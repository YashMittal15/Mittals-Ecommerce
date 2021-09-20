import React from 'react'
import zxcvbn from 'zxcvbn'

const PasswordStrengthMeter = ({password}) => {
    const testResult = zxcvbn(password);
    const num = testResult.score*100/4;

    const createPassLabel = () => {
        switch(testResult.score) {
            case 0:
                return 'very weak';
            case 1:
                return 'weak';
            case 2:
                return 'fair';
            case 3:
                return 'good';
            case 4:
                return 'strong';
            default:
                return ''; 
        }
    }

    const funcProgressColor = () => {
        switch(testResult.score) {
            case 0:
                return '#828282';
            case 1:
                return '#EA1111';
            case 2:
                return '#FFAD00';
            case 3:
                return '#9bc158';
            case 4:
                return '#00b500';
            default:
                return 'none'; 
        }
    }
    const changePasswordColor = () => ({
        width: `${num}%`,
        background: funcProgressColor(),
        height: '7px'
    })
    return (
        <>
            <div className="meter"style={{height:'7px'}}>
              <div className="meter-bar" style={changePasswordColor()}></div>
            </div>
            <p style={{color: funcProgressColor()}}>{createPassLabel()}</p>
        </>
     )
    
}
export default PasswordStrengthMeter