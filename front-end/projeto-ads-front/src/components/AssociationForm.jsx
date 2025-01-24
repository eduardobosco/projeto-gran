import React, { useState } from 'react'; // Adicione esta linha no topo do arquivo
import axios from 'axios';
import './styles.css';

const AssociationForm = () => {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedSupplier, setSelectedSupplier] = useState("");
    const [message, setMessage] = useState("");

    // Função para buscar os produtos
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/products");
            setProducts(response.data);
        } catch (error) {
            setMessage({ text: "Erro ao carregar produtos.", type: "error" });
        }
    };

    // Função para buscar os fornecedores
    const fetchSuppliers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/suppliers");
            setSuppliers(response.data);
        } catch (error) {
            setMessage({ text: "Erro ao carregar fornecedores.", type: "error" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/associations", {
                productId: selectedProduct,
                supplierId: selectedSupplier,
            });
            setMessage({ text: response.data.message, type: "success" });

            // Limpar os campos selecionados após o envio
            setSelectedProduct("");
            setSelectedSupplier("");
        } catch (error) {
            setMessage({
                text: error.response?.data?.message || "Erro ao associar fornecedor ao produto!",
                type: "error",
            });
        }
    };

    return (
        <div className="container">
            <h1>Associação de Fornecedor a Produto</h1>
            <form onSubmit={handleSubmit}>
                <select
                    value={selectedProduct}
                    onClick={fetchProducts} // Recarregar produtos ao clicar
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    required
                >
                    <option value="">Selecione um produto</option>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))
                    ) : (
                        <option>Sem produtos cadastrados</option>
                    )}
                </select>
                <select
                    value={selectedSupplier}
                    onClick={fetchSuppliers} // Recarregar fornecedores ao clicar
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                    required
                >
                    <option value="">Selecione um fornecedor</option>
                    {suppliers.length > 0 ? (
                        suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                        ))
                    ) : (
                        <option>Sem fornecedores cadastrados</option>
                    )}
                </select>
                <button type="submit">Associar Fornecedor</button>
            </form>
            {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
        </div>
    );
};

export default AssociationForm;
