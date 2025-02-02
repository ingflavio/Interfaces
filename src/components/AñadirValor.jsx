const AñadirValor = ({ onChange, jsonValor }) => {
    const handleChange = (field) => (event) => {
        onChange(field, event.target.value);
    };
    

    return (
        <>
            <input
                type="text"
                className="inputs"
                value={jsonValor.nombre}
                onChange={handleChange('nombre')}
                placeholder="Nombre de Empresa"
            />
            <input
                type="number"
                className="inputs"
                value={jsonValor.añoFinal}
                onChange={handleChange('añoFinal')}
                placeholder="Año Final"
            />
            <input
                type="number"
                className="inputs"
                value={jsonValor.añoInicial}
                onChange={handleChange('añoInicial')}
                placeholder="Año Inicial"
            />
            <textarea
                name="areaExpLab"
                id="areaExpLab"
                value={jsonValor.descripcion}
                onChange={handleChange('descripcion')}
                placeholder="Experiencia obtenida"
                rows={10}
            ></textarea>
        </>
    );
};

export default AñadirValor;