export const Boton = ({ texto, descripcion, id, efectosSeleccionados, toggleSeleccionEfecto, children }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button
                onClick={() => toggleSeleccionEfecto(id)}
                style={{
                    background: efectosSeleccionados.includes(id) ? "#9999" : "#cccccc",
                    height: "50px",
                    width: "200px",
                    marginBottom: "1rem"
                }}
            >
                {texto}
            </button>
            <span>{descripcion}</span>
            {children}
        </div>
    );
};