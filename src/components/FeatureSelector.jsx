import React, { useState } from "react";
import {
    VStack,
    Button,
    For,
    createListCollection,
    Card,
} from "@chakra-ui/react";
import {
    SelectRoot,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select";

import axios from "axios";

import { useSnapshot } from "valtio";
import state from "../context";
import { useNavigate } from "react-router-dom";
const api = axios.create({
    baseURL: "https://demo-1-684881852527.us-central1.run.app",
    headers: {
        "Content-Type": "application/json",
    },
});
const options = createListCollection({
    items: [
        {label:   'American Airlines'       , value : 'American Airlines'       },
        {label:   'Air Canada'              , value : 'Air Canada'              },
        {label:   'Air France'              , value : 'Air France'              },
        {label:   'Aeromexico'              , value : 'Aeromexico'              },
        {label:   'Aerolineas Argentinas'   , value : 'Aerolineas Argentinas'   },
        {label:   'Austral'                 , value : 'Austral'                 },
        {label:   'Avianca'                 , value : 'Avianca'                 },
        {label:   'Alitalia'                , value : 'Alitalia'                },
        {label:   'British Airways'         , value : 'British Airways'         },
        {label:   'Copa Air'                , value : 'Copa Air'                },
        {label:   'Delta Air'               , value : 'Delta Air'               },
        {label:   'Gol Trans'               , value : 'Gol Trans'               },
        {label:   'Iberia'                  , value : 'Iberia'                  },
        {label:   'K.L.M.'                  , value : 'K.L.M.'                  },
        {label:   'Qantas Airways'          , value : 'Qantas Airways'          },
        {label:   'United Airlines'         , value : 'United Airlines'         },
        {label:   'Grupo LATAM'             , value : 'Grupo LATAM'             },
        {label:   'Sky Airline'             , value : 'Sky Airline'             },
        {label:   'Latin American Wings'    , value : 'Latin American Wings'    },
        {label:   'Plus Ultra Lineas Aereas', value : 'Plus Ultra Lineas Aereas'},
        {label:   'JetSmart SPA'            , value : 'JetSmart SPA'            },
        {label:   'Oceanair Linhas Aereas'  , value : 'Oceanair Linhas Aereas'  },
        {label:   'Lacsa'                   , value : 'Lacsa'                   },
    ],
});

const options2 = createListCollection({
    items: [
        {label:"Enero",   value: "1" },
        {label:"Febrero", value: "2" },
        {label:"Marzo",   value: "3"},
        {label:"Abril",   value: "4" },
        {label:"Mayo" ,   value: "5" },
        {label:"Junio",   value: "6"},
        {label:"Julio",   value: "7" },
        {label:"Agosto",  value: "8" },
        {label:"Septiembre", value: "9" },
        {label:"Octubre", value: "10" },
        {label:"Noviembre", value: "11" },
        {label:"Diciembre", value: "12"},
    ],
});

const options3 = createListCollection({
    items: [
        { label: "Nacional", value: "N" },
        { label: "Internacional", value: "I" },
    ],
});

const features = ["opera", "mes", "tipo"];
const renderNames = {
    opera: "Operador",
    mes: "Mes",
    tipo: "Tipo",
};

const renderOptions = {
    opera: options,
    mes: options2,
    tipo: options3,
};

const flights = [{ id: 1 }];

const FeatureSelector = () => {
    const snap = useSnapshot(state);
    const navigate = useNavigate();
    const [selections, setSelections] = useState({});
    const handleSelectChange = (flightId, feature, value) => {
        setSelections((prev) => ({
            ...prev,
            [flightId]: {
                ...prev[flightId],
                [feature]: value,
            },
        }));
    };

    // Function to send selected data to the API
    const handleSubmit = async () => {
        const payload = {
            flights: flights.map((flight) => ({
                OPERA: selections[flight.id]?.opera?.value[0] || "Avianca" ,
                MES: +selections[flight.id]?.mes?.value[0] || 1,
                TIPOVUELO: selections[flight.id]?.tipo?.value[0] || "N",
            })),
        };

        console.log("Payload to be sent:", JSON.stringify(payload, null, 2));

        try {
            const response = await api.post("/predict", payload);
            // Log the entire response data to see its structure
            console.log("Complete response:", response.data);
            const predictions = response.data.predict;

            // Check if predictions exists and has the expected structure
            if (predictions && Array.isArray(predictions)) {
                // If predictions is already an array
                state.content = predictions.map((pred, index) => ({
                    opera: payload.flights[index].OPERA,
                    mes: payload.flights[index].MES,
                    tipo: payload.flights[index].TIPOVUELO,
                    pred: pred
                }));
                navigate("/predictions");
            } else if (predictions && Array.isArray(predictions.items)) {
                // If predictions has an items array
                state.content = predictions.items.map((pred, index) => ({
                    opera: payload.flights[index].OPERA,
                    mes: payload.flights[index].MES,
                    tipo: payload.flights[index].TIPOVUELO,
                    pred: pred
                }));
                navigate("/predictions");

            } else {
                // Handle unexpected response structure
                console.error("Unexpected response format:", predictions);
                state.content = [];
            }
        } catch (error) {
            console.error("Error making prediction:", error);
            state.content = [];
        }
    };

    return (
        <VStack spacing={4} align="stretch">
            {flights.map((flight) => (
                <Card.Root width="320px" key={flight.id}>

                    <Card.Body>
                        <Card.Title>ID del vuelo: {flight.id}</Card.Title>

                        <For each={features}>
                            {(feature) => (
                                <SelectRoot
                                    key={feature}
                                    field={feature}
                                    collection={renderOptions[feature]}
                                    value={selections[flight.id]?.[feature]?.value || ""}
                                    onValueChange={(value) => handleSelectChange(flight.id, feature, value)}
                                >
                                    <SelectLabel>{renderNames[feature]}</SelectLabel>
                                    <SelectTrigger>
                                        <SelectValueText placeholder="Seleccionar opción"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {renderOptions[feature].items.map((option) => (
                                            <SelectItem item={option} key={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </SelectRoot>
                            )}
                        </For>

                    </Card.Body>
                </Card.Root>
            ))}

            <Button colorScheme="blue" color="blue" onClick={handleSubmit}>
                Predecir
            </Button>
        </VStack>
    );
};

export default FeatureSelector;
