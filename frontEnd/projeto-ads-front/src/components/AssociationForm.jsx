import React, { useState, useEffect } from "react";
import axios from "axios";

const AssociationForm = () => {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedSupplier, setSelectedSupplier] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Carrega os produtos e fornecedores
        const fetchData = async () => {
            try {
                const productsResponse = await axios.get("http://localhost:3000/products");
                const suppliersResponse = await axios.get("http://localhost:3000/suppliers");
                setProducts(productsResponse.data);
                setSuppliers(suppliersResponse.data);
            } catch (error) {
                setMessage("Erro ao carregar produtos ou fornecedores.");
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/associations", {
                productId: selectedProduct,
                supplierId: selectedSupplier,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message || "Erro ao associar fornecedor ao produto!");
        }
    };

    return (
        <div>
            <h1>Associação de Fornecedor a Produto</h1>
            <form onSubmit={handleSubmit}>
                <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    required
                >
                    <option value="">Selecione um produto</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedSupplier}
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                    required
                >
                    <option value="">Selecione um fornecedor</option>
                    {suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                            {supplier.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Associar Fornecedor</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AssociationForm;
