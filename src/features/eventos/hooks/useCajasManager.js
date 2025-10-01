import { useState } from "react";
import { cajasIniciales } from "../data/cajasData";
import { efectos } from "../utils/efectos";

export const useCajasManager = () => {
    const [cajas, setCajas] = useState(cajasIniciales);
    const [cajasSeleccionadas, setCajasSeleccionadas] = useState([]);
    const [efectosSeleccionados, setEfectosSeleccionados] = useState([]);
    const [mensaje, setMensaje] = useState("");

    const toggleSeleccionCaja = (id) => {
        if (cajasSeleccionadas.includes(id)) {
            setCajasSeleccionadas(cajasSeleccionadas.filter((c) => c !== id));
        } else {
            setCajasSeleccionadas([...cajasSeleccionadas, id]);
        }
    };

    const toggleSeleccionEfecto = (efectoId) => {
        if (efectosSeleccionados.includes(efectoId)) {
            setEfectosSeleccionados(efectosSeleccionados.filter((e) => e !== efectoId));
        } else {
            setEfectosSeleccionados([...efectosSeleccionados, efectoId]);
        }
    };

    const procesar = () => {
        const nuevasCajas = cajas.map((caja) => {
            if (!cajasSeleccionadas.includes(caja.id)) return caja;

            let cajaModificada = { ...caja };
            efectosSeleccionados.forEach((efectoId) => {
                const efecto = efectos[efectoId];
                if (efecto) {
                    cajaModificada = efectoId === 1 
                        ? efecto(cajaModificada, mensaje) 
                        : efecto(cajaModificada);
                }
            });
            return cajaModificada;
        });

        setCajas(nuevasCajas);
    };

    const handleEnterKey = (event) => {
        if (event.key === "Enter" && cajasSeleccionadas.length > 0) {
            alert(`El numero de cajas seleccionadas es: ${cajasSeleccionadas}`);
        }
    };

    return {
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
    };
};