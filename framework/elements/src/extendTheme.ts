// @ts-ignore
import mergeWith from 'lodash.mergewith';
import {defaultTheme, SuperlitTheme} from "./theme";

function isFunction(value: any): boolean {
    return typeof value === 'function';
}

export function extendSuperlitTheme<T extends (SuperlitTheme | Record<string, any> & {})>(
    overrides: T,
    ...restOverrides: T[]
) {
    function customizer(source: any, override: any) {
        if (isFunction(source)) {
            return (...args: any[]) => {
                const sourceValue = source(...args);
                const overrideValue = isFunction(override)
                    ? override(...args)
                    : override;
                return mergeWith({}, sourceValue, overrideValue, customizer);
            };
        }
        return undefined;
    }

    const finalOverrides = [overrides, ...restOverrides].reduce(
        (prevValue, currentValue) => {
            return mergeWith({}, prevValue, currentValue, customizer);
        },
        defaultTheme
    );

    return finalOverrides as T & SuperlitTheme;
}
