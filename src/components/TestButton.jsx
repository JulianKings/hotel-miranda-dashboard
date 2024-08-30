import PropTypes from 'prop-types';

export default function FormButton({buttonColor, title})
{
    return <>
        <button data-testid='button' style={{color:  (buttonColor) ? buttonColor : '#135846'}}>{title}</button>
    </>
}

FormButton.propTypes = {
    buttonColor: PropTypes.string,
    title: PropTypes.string
}