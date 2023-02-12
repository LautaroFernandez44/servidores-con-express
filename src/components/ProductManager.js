import {promises as fs} from "fs"

export default class ProductManager{
    constructor(){
        this.patch = "./productos.txt";
        this.products = [];
    }

    static id = 0

    addProduct = async (title, description, price, image, code, stock) =>{

        ProductManager.id++

        let newProduct = { title, description, price, image, code, stock, id:ProductManager.id};

        this.products.push(newProduct);

        await fs.writeFile(this.patch, JSON.stringify(this.products));

        
    }

    readProducts = async ()=>{
        let respuesta = await fs.readFile(this.patch,"utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta1 = await this.readProducts()
        return console.log(respuesta1)
    }

    getProductsById = async (id)=>{
        let respuesta2 = await this.readProducts()
        if(!respuesta2.find(product => product.id === id)){
            console.log("Producto no encontrado")
        }else{
            console.log(respuesta2.find(product => product.id === id))
        }
       
    }

    deleteProductsById = async (id) =>{
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id);
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto eliminado");
        
    };

    updateProducts = async(id, ...producto) =>{
        await this.deleteProductsById(id);
        let productsOld = await this.readProducts();
        let productsModif = [{ ...producto, id },...productsOld];
        await fs.writeFile(this.patch, JSON.stringify(productsModif));
    };
}



const productos = new ProductManager;

//productos.getProducts();

// productos.addProduct("Titulo1", "Description1", 1000, "Image1", "abc121", 5 );
// productos.addProduct("Titulo2", "Description2", 2000, "Image2", "abc122", 5 );
// productos.addProduct("Titulo3", "Description1", 3000, "Image3", "abc123", 5 );
// productos.addProduct("Titulo4", "Description2", 4000, "Image4", "abc124", 5 );
// productos.addProduct("Titulo5", "Description1", 5000, "Image5", "abc125", 5 );
// productos.addProduct("Titulo6", "Description2", 6000, "Image6", "abc126", 5 );
// productos.addProduct("Titulo7", "Description1", 7000, "Image7", "abc127", 5 );
// productos.addProduct("Titulo8", "Description2", 8000, "Image8", "abc128", 5 );
// productos.addProduct("Titulo9", "Description1", 9000, "Image9", "abc129", 5 );
// productos.addProduct("Titulo10", "Description2", 10000, "Image10", "abc130", 5 );

//productos.getProductsById(4)

//productos.deleteProductsById(2);

// productos.updateProducts(
//     {
//         title: 'Titulo1',
//         description: 'Description1',
//         price: 3500,
//         image: 'Image1',
//         code: 'abc123',
//         stock: 5,
//         id: 1
//     }
// )

