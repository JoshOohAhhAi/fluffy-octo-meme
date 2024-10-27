import {useMemo} from 'react';

import type {OptionWithGroups} from '~/lib/types';

import {ProductOptionValuesLabel} from './ProductOptionValuesLabel';
import {ProductOptionValue} from './ProductOptionValue';
import type {ProductOptionValuesProps} from './ProductOptions.types';

export function ProductOptionValues({
  onSelect,
  option: initialOption,
  product,
  selectedOptionsMap,
  setSelectedOption,
  swatchesMap,
}: ProductOptionValuesProps) {
  const option = useMemo((): OptionWithGroups | undefined => {
    return product.grouping
      ? product.grouping.options?.find(
          (option) => option.name === initialOption.name,
        )
      : initialOption;
  }, [product]);

  const hasSubgroups = !!option?.hasSubgroups;
  const {name = '', optionValues} = {...option};

  return (
    <div>
      {hasSubgroups && (
        <div className="flex flex-col gap-2">
          {option?.groups?.map((group, index) => {
            if (!group.optionValues.length) return null;

            const selectedColor = selectedOptionsMap?.[name];
            const groupHasSelectedColor = group.optionValues.some(
              (optionValue) => optionValue.name === selectedColor,
            );

            return (
              <div key={index}>
                <ProductOptionValuesLabel
                  name={group.name}
                  selectedValue={groupHasSelectedColor ? selectedColor : null}
                />

                <ul className="flex flex-wrap gap-2">
                  {group.optionValues.map((optionValue) => {
                    return (
                      <li key={optionValue.name}>
                        <ProductOptionValue
                          name={name}
                          product={product}
                          selectedOptionsMap={selectedOptionsMap}
                          setSelectedOption={setSelectedOption}
                          swatchesMap={swatchesMap}
                          optionValue={optionValue}
                          onSelect={onSelect}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {!hasSubgroups && (
        <>
          <ProductOptionValuesLabel
            name={name}
            selectedValue={selectedOptionsMap?.[name]}
          />

          <ul className="flex flex-wrap gap-2">
            {optionValues?.map((optionValue) => {
              return (
                <li key={optionValue.name}>
                  <ProductOptionValue
                    name={name}
                    product={product}
                    selectedOptionsMap={selectedOptionsMap}
                    setSelectedOption={setSelectedOption}
                    swatchesMap={swatchesMap}
                    optionValue={optionValue}
                    onSelect={onSelect}
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

ProductOptionValues.displayName = 'ProductOptionValues';
