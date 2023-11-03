let save = document.getElementById("save");
save.addEventListener("click", function(event){
    event.preventDefault();

    let candyname = document.getElementById("cname").value;
    let description = document.getElementById("des").value;
    let price = document.getElementById("price").value;
    let quantity = document.getElementById("qty").value;

    let Object = {
        name: candyname, 
        des: description, 
        price: price, 
        quantity: quantity
    };
    LISTSERVERADD(Object);
    document.getElementById("cname").value = '';
    document.getElementById("des").value = '';
    document.getElementById("price").value = '';
    document.getElementById("qty").value = '';
})

async function LISTSERVERADD(OBJ){
    try{
        const response = await axios.post('https://crudcrud.com/api/4bd7e94ddcdd4b0b89e1ccc5635bec6c/candy',OBJ,{
            headers : {'Content-Type' : 'application/json'},
        })
        let UL = document.getElementById('UL');
        let LI = document.createElement('li');
        LI.classList.add('LI');
        let PLI = document.createElement('p');
        PLI.classList.add('PLI');
        PLI.innerHTML = `${response.data.name} ${response.data.des} ${response.data.price} ${response.data.quantity}`;

        //BUY ONE
        let ONE = document.createElement('button');
        ONE.textContent = "Buy 1";
        ONE.classList.add('one');
        ONE.addEventListener('click', async () =>{
            try {
                let newQuantity = response.data.quantity - 1;
                if (newQuantity >= 0) {
                    let newobj = {
                        name: response.data.name, 
                        des: response.data.des, 
                        price: response.data.price, 
                        quantity: newQuantity
                    };
                    await axios.put(`https://crudcrud.com/api/4bd7e94ddcdd4b0b89e1ccc5635bec6c/candy/${response.data._id}`, newobj, {
                        headers: { 'Content-Type': 'application/json' },
                    });
                    // Update the quantity on the webpage
                    PLI.innerHTML = `${response.data.name} ${response.data.des} ${response.data.price} ${newQuantity}`;
                }
            } catch (error) {
                console.log('Error:', error);
            }
        })

        LI.appendChild(PLI);
        LI.appendChild(ONE);
        UL.appendChild(LI);
    }catch(error){
        console.log('Error : ',error);
    }
}
//REFERESH DATA
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch data from the API when the page loads
    try {
        const response = await axios.get('https://crudcrud.com/api/4bd7e94ddcdd4b0b89e1ccc5635bec6c/candy');
        const candyList = response.data;

        let UL = document.getElementById('UL');

        candyList.forEach(candy => {
            let LI = document.createElement('li');
            LI.classList.add('LI');
            let PLI = document.createElement('p');
            PLI.classList.add('PLI');
            PLI.innerHTML = `${candy.name} ${candy.des} ${candy.price} ${candy.quantity}`;

            // BUY ONE
            let ONE = document.createElement('button');
            ONE.textContent = "Buy 1";
            ONE.classList.add('one');
            ONE.addEventListener('click', async () => {
                try {
                    const currentQuantity = candy.quantity;
                    if (currentQuantity > 0) {
                        const newQuantity = currentQuantity - 1;

                        // Update the quantity in the Crud-Crud API
                        await axios.put(`https://crudcrud.com/api/4bd7e94ddcdd4b0b89e1ccc5635bec6c/candy/${candy._id}`, {
                            quantity: newQuantity
                        }, {
                            headers: { 'Content-Type': 'application/json' },
                        });

                        // Update the quantity on the webpage
                        PLI.innerHTML = `${candy.name} ${candy.des} ${candy.price} ${newQuantity}`;
                    }
                } catch (error) {
                    console.log('Error:', error);
                }
            });

            LI.appendChild(PLI);
            LI.appendChild(ONE);
            UL.appendChild(LI);
        });
    } catch (error) {
        console.log('Error:', error);
    }
});
