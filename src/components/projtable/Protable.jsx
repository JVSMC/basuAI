import { useState } from 'react';
import { saveAs } from 'file-saver';
import '../projtable/Protable.css';

function Protable({ itemProj }) {

    const [clickedIndex, setClickedIndex] = useState(null);
    const [imageSource, setImageSource] = useState(null);

    const handleButtonClick = (index, description, items) => {
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

        fetch("https://private-basu.onrender.com/create-image", requestOptions)
            .then(response => response.json())
            .then(result => {
                setImageSource(result.imageUrl[0].url);
                setClickedIndex(index);
            })
            .catch(error => console.log('error', error));
    };

    const handleDownloadClick = (url, name) => {
        saveAs(url, name);
    };

    return (
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
                                        Ver en tamaño completo
                                    </button>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </td>
                        <td>
                            <button
                                className='round cta'
                                onClick={() => handleButtonClick(index, item.description, item.items)}
                            >
                                Ver propotipo
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Protable;