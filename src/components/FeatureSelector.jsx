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

const stores = [{ id: 1 }];

const FeatureSelector = () => {
    const [selections, setSelections] = useState({});
    const handleSelectChange = (storeId, feature, value) => {
        setSelections((prev) => ({
            ...prev,
            [storeId]: {
                ...prev[storeId],
                [feature]: value,
            },
        }));
    };

    // Function to send selected data to the API
    const handleSubmit = async () => {
        const payload = {
            flights: stores.map((store) => ({
                OPERA: selections[store.id]?.opera?.value[0] || "Avianca" ,
                MES: +selections[store.id]?.mes?.value[0] || 1,
                TIPOVUELO: selections[store.id]?.tipo?.value[0] || "N",
            })),
        };

        console.log("Payload to be sent:", JSON.stringify(payload, null, 2));

        try {
            const response = await api.post("/predict", payload);
            console.log(response.data.predict);

            // Redirect to StorePredictions with props
            // navigate("/store-predictions", { state: { stores, predictions: response.data.predict } });

        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Failed to connect to the prediction service");
        }
    };

    return (
        <VStack spacing={4} align="stretch">
            {stores.map((store) => (
                <Card.Root width="320px" key={store.id}>

                    <Card.Body>
                        <Card.Title>ID del vuelo: {store.id}</Card.Title>

                        <For each={features}>
                            {(feature) => (
                                <SelectRoot
                                    key={feature}
                                    field={feature}
                                    collection={renderOptions[feature]}
                                    value={selections[store.id]?.[feature]?.value || ""}
                                    onValueChange={(value) => handleSelectChange(store.id, feature, value)}
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
