import PropTypes from 'prop-types';

interface PropTypes {
    buttonColor: string,
    title: string
}

export default function FormButton({buttonColor, title}: PropTypes)
{
    return <>
        <button data-testid='button' style={{color:  (buttonColor) ? buttonColor : '#135846'}}>{title}</button>
    </>
}