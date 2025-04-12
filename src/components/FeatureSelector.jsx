import React, { useState } from "react";
import {
    VStack,
    Button,
    Box,
    Text,
    Heading,
} from "@chakra-ui/react";
import {
    SelectRoot,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select";
import { createListCollection } from "@ark-ui/react/collection";

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
        {label:"Enero",   value: 1 },
        {label:"Febrero", value: 2 },
        {label:"Marzo",   value: 3},
        {label:"Abril",   value: 4 },
        {label:"Mayo" ,   value: 5 },
        {label:"Junio",   value: 6},
        {label:"Julio",   value: 7 },
        {label:"Agosto",  value: 8 },
        {label:"Septiembre", value: 9 },
        {label:"Octubre", value: 10 },
        {label:"Noviembre", value: 11 },
        {label:"Diciembre", value: 12},
        // Add rest...
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
                [feature]: { value },
            },
        }));
    };

    const handleSubmit = () => {
        console.log("Selections:", selections);
    };

    return (
        <VStack spacing={4} align="stretch">
            {stores.map((store) => (
                <Box key={store.id} p={4} borderWidth="1px" borderRadius="lg">
                    <Heading size="sm">ID del vuelo: {store.id}</Heading>
                    {features.map((feature) => (
                        <SelectRoot
                            key={feature}
                            field={feature}
                            collection={renderOptions[feature]}
                            value={selections[store.id]?.[feature]?.value || ""}
                            onValueChange={(value) => handleSelectChange(store.id, feature, value)}
                        >
                            <SelectTrigger>
                                <SelectValueText placeholder={`Seleccionar ${renderNames[feature]}`} />
                            </SelectTrigger>
                            <SelectContent>
                                {renderOptions[feature].items.map((option) => (
                                    <SelectItem item={option} key={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </SelectRoot>
                    ))}
                </Box>
            ))}

            <Button colorScheme="blue" onClick={handleSubmit}>
                Predecir
            </Button>
        </VStack>
    );
};

export default FeatureSelector;
