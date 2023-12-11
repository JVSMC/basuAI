import PropTypes from 'prop-types';
import '../dropdown/DropDown.css'



/**
 * The DropDown function is a React component that renders a dropdown menu with options and allows the
 * user to select a value.
 * @returns a dropdown component.
 */
function DropDown({ txtDes, dataOpt, valueOp, handleValueOp}) {

    const handleSelectChange = (event) => {
        handleValueOp(event.target.value);
    };


    return (
        <div className="dropdown">
            <select className="drop-opt round" value={valueOp} onChange={handleSelectChange}>
            <option value="" disabled hidden>{txtDes}</option>
                {dataOpt.map((item) =>
                    <option key={item} value={item}>{item}</option>
                )}
            </select>
        </div>
    );
}



DropDown.propTypes = {
    txtDes: PropTypes.string.isRequired,
    dataOpt: PropTypes.array.isRequired,
    valueOp: PropTypes.string.isRequired,
    handleValueOp: PropTypes.func.isRequired
}

export default DropDown;