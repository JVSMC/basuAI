import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import { Toaster, toast } from 'sonner'

import '../table/TableData.css';


function TableData({ items, onSendItems, onRemoveItem }) {

    const [jsonItems, setJsonItems] = useState();

    const handleRemoveItem = (itemId) => {
        onRemoveItem(itemId - 1);
    };

    const handleSendItems = () => {
        // Verificar si hay elementos en la tabla
        if (items.length === 0) {
            // alert('La tabla está vacía. Agregue elementos antes de enviar.');
            toast.warning('Ups! You need to add an item');
            return;
        }

        // Convert the list of items to JSON format
        const json = JSON.stringify(items, null, 2);
        setJsonItems(json);

        // Call the function to send the items to API
        onSendItems(json);
        
    };

    return (
        <>
            <table className='items-data-container'>
            <Toaster richColors/>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Container</th>
                        <th>Material</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nameItem}</td>
                            <td>{item.containerShape}</td>
                            <td>{item.material}</td>
                            <td>
                                <button onClick={() => handleRemoveItem(index)}>
                                    <FontAwesomeIcon icon={faSquareMinus} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={handleSendItems}
                className='cta round make-project'
            >
                Build a project
            </button>

            {/* <pre>{jsonItems}</pre> */}
        </>
    );
}

export default TableData;