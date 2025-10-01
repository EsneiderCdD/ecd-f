import { useEffect } from "react";
import { motion } from "framer-motion";

export const Caja = ({ color, id, mensaje, animada, cajasSeleccionadas, toggleSeleccionCaja, setCajas }) => {
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
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [animada, id, setCajas]);

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