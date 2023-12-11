import { useState } from 'react';
import './Home.css';
import AddItem from './components/additem/AddItem'
import Header from './components/header/Header'
import TableData from './components/table/TableData';
import Protable from './components/projtable/Protable';

function Home() {
  const [items, setItems] = useState([]);
  const [showResponse, setShowResponse] = useState(false);
  const [itemProj, setItemProj] = useState(null);
  
  const [transitionP, setTransitionP] = useState('');

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const removeItem = (itemId) => {
    setItems(items.splice(itemId, 1));
  };

  const sendToAPI = (jsonItems) => {

    //console.log('Enviado a la API', jsonItems);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: jsonItems,
      redirect: 'follow'
    };

    fetch("https://private-basu.onrender.com/create-product", requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log( typeof result)
        setItemProj(result);
        setShowResponse(true);
        setTransitionP("in:circle:top-right");
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div transition-style="in:circle:hesitate" className='appHome'>
      <section className='left-container'>
        <Header />
        <AddItem onAddItem={addItem} />
      </section>
      <section className='right-container' transition-style={transitionP}>
        {showResponse ? (
          <Protable
            itemProj = {itemProj}
          />
        ) : (
          <TableData
            items={items}
            onSendItems={sendToAPI}
            onRemoveItem={removeItem}
          />
        )}
      </section>
    </div>
  )
}

export default Home;