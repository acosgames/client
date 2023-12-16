
import { Box, Image, Text, VStack } from '@chakra-ui/react'
import Select from 'react-select';

import config from '../../../config';

import cc2 from 'shared/model/countrycode2.json';
import fs from 'flatstore';
import { getCountry } from '../../../actions/person';
import { useEffect } from 'react';

let flagSrc = `${config.https.cdn}images/country`;

function updateCountryLabels() {
    for (let i = 0; i < cc2.length; i++) {
        let cc = cc2[i];
        if (typeof cc.label !== 'string')
            continue;
        cc.label = (<div>
            <img
                src={flagSrc + cc.value + '.svg'}
                // border="2px solid"
                borderColor="gray.100"
                borderRadius="0px"
                height={["1.4rem"]}
                loading="lazy"
            />
            <span>{cc.label}</span>
        </div>)
    }
}

// updateCountryLabels();

export default function ChooseCountry({ }) {


    let [defaultCountry] = fs.useWatch('defaultCountry');

    useEffect(() => {
        getCountry()
    }, [])
    // let filename = "assorted-"  + "-original.webp";

    if (!defaultCountry) {
        return <Text as="span">Identifying country...</Text>
    }
    return (
        <VStack p="0" spacing="0" w="100%" pt="1rem">
            <Select
                onChange={(e) => {
                    console.log("Country changed:", e);
                    fs.set('countryChanged', e);
                }}
                defaultValue={{ "label": "United States of America (USA)", "value": "US" }}
                styles={{
                    container: (baseStyles, state) =>
                        ({ ...baseStyles, width: '100%' }),
                    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                        return ({
                            color: 'var(--chakra-colors-gray-10)',
                            fontSize: '1.2rem',
                            padding: '1rem',
                            backgroundColor: 'var(--chakra-colors-gray-900)',
                            borderBottom: '1px solid',
                            borderBottomColor: 'var(--chakra-colors-gray-800)',
                            position: 'relative',
                            paddingLeft: '5rem',
                            background: `url(${flagSrc}/${data.value}.svg) no-repeat left 1rem center var(--chakra-colors-gray-900)`,
                        })
                    },
                    placeholder: (styles) => ({
                        color: 'var(--chakra-colors-gray-10)',
                        fontSize: '1.2rem'
                    }),
                    menu: (styles) => ({
                        backgroundColor: 'var(--chakra-colors-gray-800)',
                        width: '100%'
                    }),
                    input: (styles) => ({
                        color: 'var(--chakra-colors-gray-10)',
                        fontSize: '1.2rem',
                        paddingLeft: '4rem',
                    }),
                    control: (baseStyles, styles) => ({

                        background: 'transparent',
                    }),
                    menu: (baseStyles, styles) => ({
                        position: 'absolute',
                        zIndex: '99999'
                    }),
                    indicatorsContainer: (styles) => ({
                        display: 'none',
                    }),
                    singleValue: (styles, { data }) => ({
                        color: 'var(--chakra-colors-gray-10)',
                        fontSize: '1.2rem',
                        padding: '0',
                        backgroundColor: 'var(--chakra-colors-gray-900)',
                        borderBottom: '1px solid',
                        borderBottomColor: 'var(--chakra-colors-gray-800)',
                        position: 'relative',
                        paddingLeft: '4rem',
                        background: `url(${flagSrc}/${data.value}.svg) no-repeat left 0rem center transparent`,
                    })
                }}
                options={cc2}
            />
        </VStack>
    )
}