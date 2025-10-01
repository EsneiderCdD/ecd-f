import { Caja } from "./components/Caja";
import { Boton } from "./components/Boton";
import { useCajasManager } from "./hooks/useCajasManager";

function Eventos() {
    const {
        cajas,
        setCajas,
        cajasSeleccionadas,
        efectosSeleccionados,
        mensaje,
        setMensaje,
        toggleSeleccionCaja,
        toggleSeleccionEfecto,
        procesar,
        handleEnterKey
    } = useCajasManager();

    return (
        <div
            style={{
                background: "#add8e6",
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <h1>Eventos</h1>

            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                <Boton
                    texto="Boton 1"
                    descripcion="Primer Boton: Input Controlado"
                    id={1}
                    efectosSeleccionados={efectosSeleccionados}
                    toggleSeleccionEfecto={toggleSeleccionEfecto}
                >
                    <input
                        type="text"
                        placeholder="Escribe algo..."
                        style={{ width: "200px" }}
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                    />
                </Boton>

                <Boton 
                    texto="Boton 2"
                    descripcion="Cambiar Color"
                    id={2}
                    efectosSeleccionados={efectosSeleccionados}
                    toggleSeleccionEfecto={toggleSeleccionEfecto}
                />

                <Boton 
                    texto="Boton 3"
                    descripcion="Animar"
                    id={3}
                    efectosSeleccionados={efectosSeleccionados}
                    toggleSeleccionEfecto={toggleSeleccionEfecto}
                />

                <Boton texto="Boton 4" id={4} 
                    efectosSeleccionados={efectosSeleccionados}
                    toggleSeleccionEfecto={toggleSeleccionEfecto}
                />
                <Boton texto="Boton 5" id={5}
                    efectosSeleccionados={efectosSeleccionados}
                    toggleSeleccionEfecto={toggleSeleccionEfecto}
                />
                <Boton texto="Boton 6" id={6}
                    efectosSeleccionados={efectosSeleccionados}
                    toggleSeleccionEfecto={toggleSeleccionEfecto}
                />
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
                {cajas.map((caja) => (
                    <Caja
                        key={caja.id}
                        id={caja.id}
                        color={caja.color}
                        mensaje={caja.mensaje}
                        animada={caja.animada}
                        cajasSeleccionadas={cajasSeleccionadas}
                        toggleSeleccionCaja={toggleSeleccionCaja}
                        setCajas={setCajas}
                    />
                ))}
            </div>

            <button
                onClick={procesar}
                style={{
                    marginTop: "2rem",
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
            >
                Procesar
            </button>
        </div>
    );
}

export default Eventos;