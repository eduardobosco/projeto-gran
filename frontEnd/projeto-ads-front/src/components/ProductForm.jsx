import React, { useState } from "react";
import axios from "axios";

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        barcode: "",
        description: "",
        quantity: "",
        category: "",
        expiryDate: "",
    });

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/products", formData);
            setMessage(response.data.message);
            setFormData({
                name: "",
                barcode: "",
                description: "",
                quantity: "",
                category: "",
                expiryDate: "",
            });
        } catch (error) {
            setMessage(error.response.data.message || "Erro ao cadastrar produto!");
        }
    };

    return (
        <div>
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
            {message && <p>{message}</p>}
        </div>
    );
};

export default ProductForm;
