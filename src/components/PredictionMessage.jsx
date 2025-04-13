import React from 'react';
import { Box, Text, Card, HStack } from '@chakra-ui/react';
import { useSnapshot } from "valtio";
import state from "../context";

function PredictionMessage() {
    const snap = useSnapshot(state);

    if (!snap.content || snap.content.length === 0) {
        return (
            <Box p={4} bg="blue.50" color="blue.800" borderRadius="md" textAlign="center">
                No predictions available yet
            </Box>
        );
    }

    return (
        <Box borderWidth="1px" borderRadius="lg" p={4} shadow="sm">
            <Text fontSize="xl" fontWeight="bold" mb={4}>Predicciones</Text>
            {snap.content.map((item, index) => {
                const isHighRisk = item.pred > 0.5;
                const footerBg = isHighRisk ? "red.100" : "green.100";
                const footerColor = isHighRisk ? "red.800" : "green.800";
                const message = isHighRisk
                    ? "Probabilidad de demora alta"
                    : "Probabilidad de demora baja";

                return (
                    <Card.Root width="320px" key={index}>
                        <Card.Body>
                            <HStack>
                                <Text fontWeight="bold">Operador:</Text>
                                <Text>{item.opera}</Text>
                            </HStack>

                            <HStack>
                                <Text fontWeight="bold">Mes:</Text>
                                <Text>{item.mes}</Text>
                            </HStack>

                            <HStack>
                                <Text fontWeight="bold">Tipo de vuelo:</Text>
                                <Text>{item.tipo === "N" ? "Nacional" : "Internacional"}</Text>
                            </HStack>

                            <Card.Footer
                                justifyContent="flex-end"
                                bg={footerBg}
                                color={footerColor}
                                p={2}
                                borderRadius="md"
                                fontWeight="semibold"
                            >
                                {message}
                            </Card.Footer>
                        </Card.Body>
                    </Card.Root>
                );
            })}
        </Box>
    );
}

export default PredictionMessage;
