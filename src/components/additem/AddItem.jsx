import { useState } from 'react';
import PropTypes from 'prop-types';
import '../additem/AddItem.css'
import DropDown from '../dropdown/DropDown';

/**
 * The AddItem function is a React component that renders a form with input fields for a product name,
 * container shape, and material, and a submit button to add the item.
 * @returns a form with three input fields and a button. The input fields are for entering the item
 * name, selecting the container shape, and selecting the material. The button is for submitting the
 * form.
 */
function AddItem({ onAddItem }) {

    const [item, setItem] = useState('');
    const [contianer, setContainer] = useState('');
    const [material, setMaterial] = useState('');

    const containerOpt = ['Caja', 'Botella', 'Bolsa', 'Lata'];
    const materialOpt = ['Carton', 'Vidrio', 'Plastico', 'Aluminio'];

    /**
     * The handleSubmit function prevents the form from being submitted automatically, checks if all
     * fields are filled, creates a new item object with the input values, calls the onAddItem function
     * with the new item, and resets the input fields.
     * @returns The function does not explicitly return anything.
     */
    const handleSubmit = (event) => {
        event.preventDefault(); // Evita que se envíe el formulario automáticamente

        if (!item || !contianer || !material) {
            alert('Por favor, complete todos los campos');
            return;
        }

        const newItem = {
            "nameItem": item,
            "containerShape": contianer,
            material
        }

        onAddItem(newItem);

        setItem('');
        setContainer('');
        setMaterial('');

    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder='Producto'
                className='round'
            />
            <DropDown
                txtDes='Contenedor'
                dataOpt={containerOpt}
                valueOp={contianer}
                handleValueOp={setContainer}
            />
            <DropDown
                txtDes='Meterial'
                dataOpt={materialOpt}
                valueOp={material}
                handleValueOp={setMaterial}
            />
            <button type="submit" className='round cta'>Agregar</button>
        </form>
    );
}


AddItem.propTypes = {
    onAddItem: PropTypes.func.isRequired
}

export default AddItem;