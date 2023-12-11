import { useState } from 'react';
import '../table/TableData.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus } from '@fortawesome/free-regular-svg-icons';

function TableData({ items, onSendItems, onRemoveItem }) {

    const [jsonItems, setJsonItems] = useState();

    const handleRemoveItem = (itemId) => {
        onRemoveItem(itemId - 1);
    };

    const handleSendItems = () => {
        // Verificar si hay elementos en la tabla
        if (items.length === 0) {
            alert('La tabla está vacía. Agregue elementos antes de enviar.');
            return;
        }

        // Convertir la lista de items a formato JSON
        const json = JSON.stringify(items, null, 2);
        setJsonItems(json);

        // Llamar a la función para enviar los items a la API
        onSendItems(json);
        
    };

    return (
        <>
            <table className='items-data-container'>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Contenedor</th>
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
                Generar proyecto
            </button>

            {/* <pre>{jsonItems}</pre> */}
        </>
    );
}

export default TableData;