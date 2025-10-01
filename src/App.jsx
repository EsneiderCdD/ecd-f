import { useState, useEffect } from "react";
import { motion } from "framer-motion";
function Eventos() {

    const [cajas, setCajas] = useState([
        { id: 1, mensaje: "", color: "red", animada: false },
        { id: 2, mensaje: "", color: "green", animada: false },
        { id: 3, mensaje: "", color: "blue", animada: false },
        { id: 4, mensaje: "", color: "yellow", animada: false },
        { id: 5, mensaje: "", color: "black", animada: false },
        { id: 6, mensaje: "", color: "white", animada: false },
    ]);

    const [mensaje, setMensaje] = useState("");
    const [cajasSeleccionadas, setCajasSeleccionadas] = useState([]);
    const [efectosSeleccionados, setEfectosSeleccionados] = useState([]);
    const efecto4Activo = efectosSeleccionados.includes(4);

    const handleEnterKey = (event) => {
        if (event.key === "Enter" && cajasSeleccionadas.length > 0) {
            alert(`El numero de cajas seleccionadas es: ${cajasSeleccionadas}`)
        };
    };
    const toggleSeleccionEfecto = (efectoId) => {
        if (efectosSeleccionados.includes(efectoId)) {
            setEfectosSeleccionados(efectosSeleccionados.filter((e) => e !== efectoId));
        } else {
            setEfectosSeleccionados([...efectosSeleccionados, efectoId]);
        }
    };

    const toggleSeleccionCaja = (id) => {
        if (cajasSeleccionadas.includes(id)) {
            setCajasSeleccionadas(cajasSeleccionadas.filter((c) => c !== id));
        } else {
            setCajasSeleccionadas([...cajasSeleccionadas, id]);
        }
    };

    const efectos = {
        1: (caja) => ({ ...caja, mensaje }), // Aplica el mensaje
        2: (caja) => ({ ...caja, color: getRandomColor() }), // Cambia el color
        3: (caja) => ({ ...caja, animada: true }),
        4: (caja) => caja
        // Puedes dejar espacio aquí para los efectos 3–6
    };


    const getRandomColor = () => {
        const colores = ["red", "green", "blue", "yellow", "purple", "orange", "pink"];
        return colores[Math.floor(Math.random() * colores.length)];
    };



    const procesar = () => {
        const nuevasCajas = cajas.map((caja) => {
            if (!cajasSeleccionadas.includes(caja.id)) return caja;

            // Aplicar todos los efectos en orden
            let cajaModificada = { ...caja };
            efectosSeleccionados.forEach((efectoId) => {
                const efecto = efectos[efectoId];
                if (efecto) {
                    cajaModificada = efecto(cajaModificada);
                }
            });
            return cajaModificada;
        });

        setCajas(nuevasCajas);
    };

    const Boton = ({ texto, descripcion, id }) => {
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

            </div>
        );
    };

    const Caja = ({ color, id, mensaje, animada, }) => {
        const seleccionada = cajasSeleccionadas.includes(id);
        const borde = seleccionada ? "5px solid black" : "none";
        const cajaBase = {
            background: color,
            height: "200px",
            width: "200px",
            border: borde,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"

        };

        useEffect(() => {
            if (animada) {
                const timer = setTimeout(() => {
                    setCajas((prevCajas) =>
                        prevCajas.map((caja) =>
                            caja.id === id ? { ...caja, animada: false } : caja
                        )
                    );
                }, 2500); // 2.5 segundos (ligeramente más que la duración de animación)

                return () => clearTimeout(timer);
            }
        }, [animada, id]);

        return animada ? (
            <motion.div
                onClick={() => toggleSeleccionCaja(id)}
                style={cajaBase}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: 1 }}
            >
                <span>{mensaje}</span>
            </motion.div>
        ) : (
            <div
                onClick={() => toggleSeleccionCaja(id)}
                style={cajaBase}
            >
                <span>{mensaje}</span>
            </div>
        );
    };

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
                <div>
                    <Boton
                        texto="Boton 1"
                        descripcion="Primer Boton: Input Controlado"
                        id={1}
                    >
                    </Boton>
                    <input
                        type="text"
                        placeholder="Escribe algo..."
                        style={{ width: "200px" }}
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                    />
                </div>



                <Boton texto="Boton 2"
                    descripcion={"Cambiar Color"}
                    id={2} />



                <Boton texto="Boton 3"
                    descripcion="Animar"
                    id={3} />
                <Boton texto="Boton 4" id={4} />
                <Boton texto="Boton 5" id={5} />
                <Boton texto="Boton 6" id={6} />
            </div>


            <div style={{ display: "flex", gap: "1rem" }}>
                {cajas.map((caja) => (
                    <Caja
                        key={caja.id}
                        id={caja.id}
                        color={caja.color}
                        mensaje={caja.mensaje}
                        animada={caja.animada}
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
