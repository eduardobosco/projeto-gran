const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Configuração do CORS
app.use(cors()); // Permite requisições de qualquer origem

// Configurações do body-parser
app.use(bodyParser.json());

let suppliers = []; // Armazena fornecedores
let products = []; // Armazena produtos
let associations = []; // Armazena associações entre fornecedores e produtos

// Rota para cadastrar fornecedor
app.post("/suppliers", (req, res) => {
    const { name, cnpj, address, phone, email, contact } = req.body;

    // Verifica se o CNPJ já existe
    if (suppliers.some(supplier => supplier.cnpj === cnpj)) {
        return res.status(400).json({ message: "Fornecedor com esse CNPJ já está cadastrado!" });
    }

    const newSupplier = { id: suppliers.length + 1, name, cnpj, address, phone, email, contact };
    suppliers.push(newSupplier);
    res.status(201).json({ message: "Fornecedor cadastrado com sucesso!", supplier: newSupplier });
});

// Rota para listar fornecedores
app.get("/suppliers", (req, res) => {
    res.json(suppliers);
});

// Rota para cadastrar produto
app.post("/products", (req, res) => {
    const { name, barcode, description, quantity, category, expiryDate } = req.body;

    // Verifica se o código de barras já existe
    if (products.some(product => product.barcode === barcode)) {
        return res.status(400).json({ message: "Produto com este código de barras já está cadastrado!" });
    }

    const newProduct = { id: products.length + 1, name, barcode, description, quantity, category, expiryDate };
    products.push(newProduct);
    res.status(201).json({ message: "Produto cadastrado com sucesso!", product: newProduct });
});

// Rota para listar produtos
app.get("/products", (req, res) => {
    res.json(products);
});

// Rota para associar fornecedor a produto
app.post("/associations", (req, res) => {
    const { supplierId, productId } = req.body;

    // Verifica se o fornecedor já está associado ao produto
    if (associations.some(assoc => assoc.supplierId === supplierId && assoc.productId === productId)) {
        return res.status(400).json({ message: "Fornecedor já está associado a este produto!" });
    }

    const newAssociation = { id: associations.length + 1, supplierId, productId };
    associations.push(newAssociation);
    res.status(201).json({ message: "Fornecedor associado com sucesso ao produto!", association: newAssociation });
});

// Rota para listar associações
app.get("/associations", (req, res) => {
    const result = associations.map(assoc => ({
        product: products.find(product => product.id === assoc.productId),
        supplier: suppliers.find(supplier => supplier.id === assoc.supplierId),
    }));
    res.json(result);
});

// Inicializa o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
