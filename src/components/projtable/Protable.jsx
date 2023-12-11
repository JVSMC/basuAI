import { useState } from 'react';
import { saveAs } from 'file-saver';
import { Toaster, toast } from 'sonner'

import '../projtable/Protable.css';

function Protable({ itemProj }) {

    const [clickedIndex, setClickedIndex] = useState(null);
    const [imageSource, setImageSource] = useState(null);

    const handleButtonClick = async (index, description, items, name) => {
        try {

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify([
                {
                    "description": description,
                    "items": items
                }
            ]);

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const loadingPromise= toast.loading('Making an example...');
            const response = await fetch("https://private-basu.onrender.com/create-image", requestOptions);
            const result = await response.json();

            // Oculta la notificación de carga
            toast.dismiss(loadingPromise);

            // Muestra la notificación de éxito
            toast.success(`Great!, there is an explample of: ${name}`);

            // Actualiza el estado según sea necesario
            setImageSource(result.imageUrl[0].url);
            setClickedIndex(index);
        } catch (error) {
            console.log('error', error);

            // Show error notification
            toast.error('Error occurred');
        }
    };

    const handleDownloadClick = (url, name) => {
        saveAs(url, name);
    };

    return (
        <>
            <Toaster richColors />
            <table className='project-data-container'>
                <tbody>
                    {itemProj.listOfProjects.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <h3 className='semi-bold'>{item.name}</h3>
                                <p className='light'>{item.description}</p>
                                <ul>
                                    {item.items.map((product, index) => (
                                        <li key={index}
                                            className='italic '
                                        >
                                            {product}
                                        </li>
                                    ))}
                                </ul>
                                {clickedIndex === index ? (
                                    <div className='img-container'>
                                        <img
                                            src={imageSource}
                                            alt={item.name}
                                            title={item.name}
                                            loading='lazy' aria-hidden="true"
                                            className="round"
                                        />
                                        <button
                                            onClick={() => handleDownloadClick(imageSource, item.name)}
                                            className='round cta-2 semi-bold'
                                        >
                                            Full size
                                        </button>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </td>
                            <td>
                                <button
                                    className='round cta'
                                    onClick={() => handleButtonClick(index, item.description, item.items, item.name)}
                                >
                                    See an example
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Protable;