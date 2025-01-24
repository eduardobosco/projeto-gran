import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        barcode: "",
        description: "",
        quantity: "",
        category: "",
        expiryDate: "",
    });

    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");

    // Fetch products from the backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Erro ao carregar os produtos:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/products", formData);
            setMessage({ type: "success", text: response.data.message });
            setFormData({
                name: "",
                barcode: "",
                description: "",
                quantity: "",
                category: "",
                expiryDate: "",
            });

            // Atualiza a lista de produtos após o cadastro
            setProducts((prev) => [...prev, response.data.product]);
        } catch (error) {
            setMessage({
                type: "error",
                text: error.response?.data?.message || "Erro ao cadastrar produto!",
            });
        }
    };

    return (
        <div className="container">
            <h1>Cadastro de Produto</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Insira o nome do produto"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Insira o código de barras"
                    value={formData.barcode}
                    onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Descreva brevemente o produto"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Quantidade disponível"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Categoria"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                />
                <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
                <button type="submit">Cadastrar</button>
            </form>
            {message && (
                <p className={`message ${message.type}`}>{message.text}</p>
            )}

            {/* Products Table */}
            <h2>Produtos Cadastrados</h2>
            {products.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nome do Produto</th>
                            <th>Código de Barras</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.barcode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Não há produtos cadastrados ainda.</p>
            )}
        </div>
    );
};

export default ProductForm;
