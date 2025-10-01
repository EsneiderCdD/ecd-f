import { coloresDisponibles } from "../data/cajasData";

export const getRandomColor = () => {
    return coloresDisponibles[Math.floor(Math.random() * coloresDisponibles.length)];
};

export const efectos = {
    1: (caja, mensaje) => ({ ...caja, mensaje }), // Aplica el mensaje
    2: (caja) => ({ ...caja, color: getRandomColor() }), // Cambia el color
    3: (caja) => ({ ...caja, animada: true }), // Anima
    4: (caja) => caja
};