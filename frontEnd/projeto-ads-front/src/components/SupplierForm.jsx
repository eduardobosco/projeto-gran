import React, { useState } from "react";
import axios from "axios";

const SupplierForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        cnpj: "",
        address: "",
        phone: "",
        email: "",
        contact: "",
    });

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/suppliers", formData);
            setMessage(response.data.message);
            setFormData({ name: "", cnpj: "", address: "", phone: "", email: "", contact: "" });
        } catch (error) {
            setMessage(error.response.data.message || "Erro ao cadastrar fornecedor!");
        }
    };

    return (
        <div>
            <h1>Cadastro de Fornecedor</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Insira o nome da empresa"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="00.000.000/0000-00"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Insira o endereço completo da empresa"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="(00) 0000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="exemplo@fornecedor.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Nome do contato principal"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                />
                <button type="submit">Cadastrar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SupplierForm;
