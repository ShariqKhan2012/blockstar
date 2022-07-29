import Overlay from './Overlay';
import Button from './Button';

const Dialog = (props) => {
    if(!props.show) {
        return '';
    }
    
    let color = 'orange';
    let iconSvg = null;
    const svgClass = "w-5 h-5 align-middle inline-block mr-2 ";

    if (props.type == 'success') {
        color = 'green';
        iconSvg = <svg className={svgClass + ' text-' + color+ '-500'} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
    }
    else if (props.type == 'error') {
        color = 'red';
        iconSvg = <svg className={svgClass + 'text-' + color + '-500'} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    }
    else {  //(type == 'warning')
        iconSvg = <svg className={svgClass + 'text-' + color + '-500'} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
    }
    return (
        <Overlay>
            <div className="w-[420px] max-w-[90%]  bg-[#fff] text-center">
                <div className="p-3 bg-[#f5f8ff] flex justify-center items-center align-middle text-center">
                    {iconSvg}
                    <strong>{props.title ?? 'Notice'}</strong>
                </div>
                <div className="px-4 py-8">
                    {props.msg}
                </div>
                {
                    (props.onOk || props.onCancel)
                    &&
                    <div className="p-4 bosrder-t-2 borsder-[#f5f8ff] flex justify-around align-middle">
                        {
                            props.onOk
                            &&
                            <Button type="primary" onClick={props.onOk} label={props.okLabel ?? 'Ok'} />
                        }
                        {
                            props.onCancel
                            &&
                            <Button type="secondary" onClick={props.onCancel} label={props.cancelLabel ?? 'Cancel'} />
                        }
                    </div>
                }
            </div>
        </Overlay>
    )
}

export default Dialog;