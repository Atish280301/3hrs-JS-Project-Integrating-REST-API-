let save = document.getElementById('save');
save.addEventListener('click', function(event){
    event.preventDefault();

    let candyname = document.getElementById('candyname').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('candyprice').value;
    let cquantity = document.getElementById('quantity').value;

    let OBJECT = {
        name : candyname,
        des : description,
        price: price,
        quantity: cquantity
    };
    DATAOPER(OBJECT);
    document.getElementById('candyname').value = '';
    document.getElementById('description').value = '';
    document.getElementById('candyprice').value = '';
    document.getElementById('quantity').value = '';
})

async function DATAOPER(OBJ){
    try{
        const response = await axios.post('https://crudcrud.com/api/eec8dbe9b996424b96a258b5f20229d5/candy',OBJ,{
            headers: {'Content-Type' : 'application/json'},
        })
        let UL = document.getElementById('UL');
        let LI = document.createElement('li');
        LI.classList.add('LI');
        let PLI = document.createElement('p');
        PLI.classList.add('PLI');
        PLI.innerHTML = `${response.data.name} ${response.data.des} ${response.data.price} ${response.data.quantity}`;

        //BUY ONE PRODUCT
        let ONE = document.createElement('button');
        ONE.textContent = "Buy 1";
        ONE.classList.add('ONE');
        ONE.addEventListener('click', async () => {
            try {
                // Fetch the latest data for the product
                const updatedResponse = await axios.get(`https://crudcrud.com/api/eec8dbe9b996424b96a258b5f20229d5/candy/${response.data._id}`);
                const updatedCandy = updatedResponse.data;
                let candyi = parseInt(updatedCandy.quantity);
                // Check if there's enough quantity to decrease
                if (candyi >= 1) {
                    candyi -= 1;
                    let newvs = candyi.toString();
                    let newobj = {
                        name: updatedCandy.name,
                        des: updatedCandy.des,
                        price: updatedCandy.price,
                        quantity: newvs
                    };
                    // Update the product's quantity
                    await axios.put(`https://crudcrud.com/api/eec8dbe9b996424b96a258b5f20229d5/candy/${updatedCandy._id}`, newobj, {
                        headers: { 'Content-Type': 'application/json' },
                    });
                    // Update the displayed information
                    PLI.innerHTML = `${newobj.name} ${newobj.des} ${newobj.price} ${newobj.quantity}`;
                }
            } catch (error) {
                console.log('Error: ', error);
            }
        });
        //BUY TWO PRODUCT
        let TWO = document.createElement('button');
        TWO.textContent = "Buy 2";
        TWO.classList.add('TWO');
        TWO.addEventListener('click', async () =>{
            try {
                // Fetch the latest data for the product
                const updatedResponse = await axios.get(`https://crudcrud.com/api/eec8dbe9b996424b96a258b5f20229d5/candy/${response.data._id}`);
                const updatedCandy = updatedResponse.data;
                let candyi = parseInt(updatedCandy.quantity);
                // Check if there's enough quantity to decrease
                if (candyi >= 2) {
                    candyi -= 2;
                    let newvs = candyi.toString();
                    let newobj = {
                        name: updatedCandy.name,
                        des: updatedCandy.des,
                        price: updatedCandy.price,
                        quantity: newvs
                    };
                    // Update the product's quantity
                    await axios.put(`https://crudcrud.com/api/eec8dbe9b996424b96a258b5f20229d5/candy/${updatedCandy._id}`, newobj, {
                        headers: { 'Content-Type': 'application/json' },
                    });
                    // Update the displayed information
                    PLI.innerHTML = `${newobj.name} ${newobj.des} ${newobj.price} ${newobj.quantity}`;
                }
            } catch (error) {
                console.log('Error: ', error);
            }
        });
        let THREE = document.createElement('button');
        THREE.textContent = "Buy 3";
        THREE.classList.add('THREE');
        THREE.addEventListener('click', async () => {
            try {
                // Fetch the latest data for the product
                const updatedResponse = await axios.get(`https://crudcrud.com/api/eec8dbe9b996424b96a258b5f20229d5/candy/${response.data._id}`);
                const updatedCandy = updatedResponse.data;
                let candyi = parseInt(updatedCandy.quantity);
                // Check if there's enough quantity to decrease
                if (candyi >= 3) {
                    candyi -= 3;
                    let newvs = candyi.toString();
                    let newobj = {
                        name: updatedCandy.name,
                        des: updatedCandy.des,
                        price: updatedCandy.price,
                        quantity: newvs
                    };
                    // Update the product's quantity
                    await axios.put(`https://crudcrud.com/api/eec8dbe9b996424b96a258b5f20229d5/candy/${updatedCandy._id}`, newobj, {
                        headers: { 'Content-Type': 'application/json' },
                    });
                    // Update the displayed information
                    PLI.innerHTML = `${newobj.name} ${newobj.des} ${newobj.price} ${newobj.quantity}`;
                }
            } catch (error) {
                console.log('Error: ', error);
            }
        })

        LI.appendChild(PLI);
        LI.appendChild(THREE);
        LI.appendChild(TWO);
        LI.appendChild(ONE);
        UL.appendChild(LI);
    }catch(error){
        console.log('Error : ',error);
    }
}
//AFTER REFRESH DATA AND OPERATIONS
document.addEventListener('DOMContentLoaded', async () => {
    // Your code here
    try {
        // Fetch the initial data from the API
        const response = await axios.get('https://crudcrud.com/api/eec8dbe9b996424b96a258b5f20229d5/candy');
        const candyData = response.data;

        let UL = document.getElementById('UL');

        // Loop through the data and create elements for each candy
        candyData.forEach(candy => {
            let LI = document.createElement('li');
            LI.classList.add('LI');

            let PLI = document.createElement('p');
            PLI.classList.add('PLI');
            PLI.innerHTML = `${candy.name} ${candy.des} ${candy.price} ${candy.quantity}`;

            // BUY ONE PRODUCT
            let ONE = document.createElement('button');
            ONE.textContent = "Buy 1";
            ONE.classList.add('ONE');
            ONE.addEventListener('click', async () => {
                try {
                    // Fetch the latest data for the product
                    const updatedResponse = await axios.get(`https://crudcrud.com/api/eec8dbe9b996424b96a258b5f20229d5/candy/${candy._id}`);
                    const updatedCandy = updatedResponse.data;
                    let candyi = parseInt(updatedCandy.quantity);

                    // Check if there's enough quantity to decrease
                    if (candyi >= 1) {
                        candyi -= 1;
                        let newvs = candyi.toString();
                        let newobj = {
                            name: updatedCandy.name,
                            des: updatedCandy.des,
                            price: updatedCandy.price,
                            quantity: newvs
                        };

                        // Update the product's quantity
                        await axios.put(`https://crudcrud.com/api/eec8dbe9b996424b96a258b5f20229d5/candy/${updatedCandy._id}`, newobj, {
                            headers: { 'Content-Type': 'application/json' },
                        });

                        // Update the displayed information
                        PLI.innerHTML = `${newobj.name} ${newobj.des} ${newobj.price} ${newobj.quantity}`;
                    }
                } catch (error) {
                    console.log('Error: ', error);
                }
            });

            let TWO = document.createElement('button');
            TWO.textContent = "Buy 2";
            TWO.classList.add('TWO');
            TWO.addEventListener('click', async () => {
                try {
                    // Fetch the latest data for the product
                    const updatedResponse = await axios.get(`https://crudcrud.com/api/eec8dbe9b996424b96a258b5f20229d5/candy/${candy._id}`);
                    const updatedCandy = updatedResponse.data;
                    let candyi = parseInt(updatedCandy.quantity);

                    // Check if there's enough quantity to decrease
                    if (candyi >= 2) {
                        candyi -= 2;
                        let newvs = candyi.toString();
                        let newobj = {
                            name: updatedCandy.name,
                            des: updatedCandy.des,
                            price: updatedCandy.price,
                            quantity: newvs
                        };

                        // Update the product's quantity
                        await axios.put(`https://crudcrud.com/api/eec8dbe9b996424b96a258b5f20229d5/candy/${updatedCandy._id}`, newobj, {
                            headers: { 'Content-Type': 'application/json' },
                        });

                        // Update the displayed information
                        PLI.innerHTML = `${newobj.name} ${newobj.des} ${newobj.price} ${newobj.quantity}`;
                    }
                } catch (error) {
                    console.log('Error: ', error);
                }
            });

            let THREE = document.createElement('button');
            THREE.textContent = "Buy 3";
            THREE.classList.add('THREE');
            THREE.addEventListener('click', async () => {
                try {
                    // Fetch the latest data for the product
                    const updatedResponse = await axios.get(`https://crudcrud.com/api/eec8dbe9b996424b96a258b5f20229d5/candy/${candy._id}`);
                    const updatedCandy = updatedResponse.data;
                    let candyi = parseInt(updatedCandy.quantity);

                    // Check if there's enough quantity to decrease
                    if (candyi >= 3) {
                        candyi -= 3;
                        let newvs = candyi.toString();
                        let newobj = {
                            name: updatedCandy.name,
                            des: updatedCandy.des,
                            price: updatedCandy.price,
                            quantity: newvs
                        };

                        // Update the product's quantity
                        await axios.put(`https://crudcrud.com/api/eec8dbe9b996424b96a258b5f20229d5/candy/${updatedCandy._id}`, newobj, {
                            headers: { 'Content-Type': 'application/json' },
                        });

                        // Update the displayed information
                        PLI.innerHTML = `${newobj.name} ${newobj.des} ${newobj.price} ${newobj.quantity}`;
                    }
                } catch (error) {
                    console.log('Error: ', error);
                }
            });

            // Append elements to the UL
            LI.appendChild(PLI);
            LI.appendChild(ONE);
            LI.appendChild(TWO);
            LI.appendChild(THREE);
            UL.appendChild(LI);
        });
    } catch (error) {
        console.log('Error : ', error);
    }
});
